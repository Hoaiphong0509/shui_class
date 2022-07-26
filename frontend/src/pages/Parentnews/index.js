import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getMyParentnews } from 'services/redux/actions/parentnews'
import { getParentnews } from 'services/redux/actions/teacher'
import { getCurrentProfile } from 'services/redux/actions/profile'

import LoaderComponent from 'components/core/LoaderComponent'
import NewsComponent from 'components/News/NewsComponent'
import { ROLES } from 'constants/AppConstants'

const Parentnews = ({
  parentnews: { parentnewss, loading: ldc },
  profile: { myprofile, loading: ldp },
  user: { user, loading: ldu },
  getMyParentnews,
  getParentnews,
  getCurrentProfile
}) => {

  useEffect(() => {
    if (user && user?.roles.includes(ROLES.TEACHER)) getParentnews()
    else getMyParentnews()
  }, [getMyParentnews, getParentnews, user])
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  if (
    parentnewss === null ||
    parentnewss === undefined ||
    parentnewss.length === 0
  )
    return <h1>Chưa có bản tin nào</h1>

  return ldu || ldc || ldp || myprofile === null || user === null ? (
    <LoaderComponent />
  ) : (
    <NewsComponent newss={parentnewss} myprofile={myprofile} asNews="parent" />
  )
}

Parentnews.prototype = {
  parentnews: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getMyParentnews: PropTypes.func.isRequired,
  getParentnews: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  parentnews: state.parentnews,
  user: state.user,
  profile: state.profile
})

export default connect(mapStateToProps, {
  getMyParentnews,
  getCurrentProfile,
  getParentnews
})(Parentnews)
