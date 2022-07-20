import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { getMyClassnews } from 'services/redux/actions/classnews'
import { getCurrentProfile } from 'services/redux/actions/profile'

import LoaderComponent from 'components/core/LoaderComponent'
import NewsComponent from 'components/News/NewsComponent'

const Classnews = ({
  classnews: { classnewss, loading: ldc },
  profile: { myprofile, loading: ldp },
  getMyClassnews,
  getCurrentProfile
}) => {
  useEffect(() => {
    getMyClassnews()
  }, [getMyClassnews])
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  return ldc ||
    ldp ||
    classnewss === null ||
    classnewss.length === 0 ||
    myprofile === null ? (
    <LoaderComponent />
  ) : (
    <NewsComponent newss={classnewss} myprofile={myprofile} asNews="class" />
  )
}

Classnews.prototype = {
  classnews: PropTypes.object.isRequired,
  getMyClassnews: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  classnews: state.classnews,
  profile: state.profile
})

export default connect(mapStateToProps, { getMyClassnews, getCurrentProfile })(
  Classnews
)
