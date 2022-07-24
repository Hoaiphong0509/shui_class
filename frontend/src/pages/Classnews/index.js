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

  if (classnewss === null || classnewss === undefined || classnewss.length === 0)
    return <h1>Chưa có bản tin nào</h1>

  return ldc ||
    ldp ||
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
