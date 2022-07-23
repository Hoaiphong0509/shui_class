import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getMyParentnews } from 'services/redux/actions/parentnews'
import { getCurrentProfile } from 'services/redux/actions/profile'

import LoaderComponent from 'components/core/LoaderComponent'
import NewsComponent from 'components/News/NewsComponent'

const Parentnews = ({
  parentnews: { parentnewss, loading: ldc },
  profile: { myprofile, loading: ldp },
  getMyParentnews,
  getCurrentProfile
}) => {
  useEffect(() => {
    getMyParentnews()
  }, [getMyParentnews])
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  if (
    parentnewss === null ||
    parentnewss === undefined || 
    parentnewss.length === 0
  )
    return <h1>Bạn chưa được thêm vào lớp nào</h1>

  return ldc || ldp || myprofile === null ? (
    <LoaderComponent />
  ) : (
    <NewsComponent newss={parentnewss} myprofile={myprofile} asNews="parent" />
  )
}

Parentnews.prototype = {
  parentnews: PropTypes.object.isRequired,
  getMyParentnews: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  parentnews: state.parentnews,
  profile: state.profile
})

export default connect(mapStateToProps, { getMyParentnews, getCurrentProfile })(
  Parentnews
)
