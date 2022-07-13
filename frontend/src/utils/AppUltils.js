// eslint-disable-next-line
export const isServer = typeof window !== 'undefined'

export const isRequired = (value) => (value ? true : false)

export const isName = (name) => {
  const re = /^(?=.*)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z]{6,}$/
  return re.test(String(name))
}

export const isPassword = (password) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  return re.test(String(password))
}

export const isEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export const isPhoneNumber = (phone) => {
  const phoneno = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
  return phone.match(phoneno)
}

export const getCodeYoutube = (value) => {
  const REGEX = /v=(\w+)/
  const res = value.match(REGEX)
  if (res) return res[1]
  else return null
}

export const validateSizeFile = (input) => {
  const fileSize = input.files[0].size / 1024 / 1024
  return fileSize > 1 ? true : false
}

export const validHexColor = (hexColor) => {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hexColor)
}

export const scrollToTop = () => {
  if (isServer)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
}

export const filter_duplicates = (arr1, arr2) => {
  let duplicates = []
  let unique = []
  for (let v of arr1) {
    if (arr2.includes(v)) {
      duplicates.push(v)
    } else {
      unique.push(v)
    }
  }
  for (let v of arr2) {
    if (!duplicates.includes(v)) {
      unique.push(v)
    }
  }

  return { duplicates: duplicates, unique: unique }
}

export const classificationFunc = (point) => {
  let xl = ''
  if (point <= 20) xl = 'Yếu'
  if (point <= 50) xl = 'Trung bình'
  if (point > 50 && point < 180) xl = 'Khá'
  if (point >= 180) xl = 'Giỏi'
  return xl
}

export const calcAvgPoint = (
  oral_1,
  oral_2,
  test15m_1,
  test15m_2,
  test15m_3,
  test45m_1,
  test45m_2,
  final
) => {
  let point = 0

  point =
    (+oral_1 +
      +oral_2 +
      (+test15m_1 + +test15m_2 + +test15m_3) +
      2 * (+test45m_1 + +test45m_2) +
      3 * +final) /
    12

  return point.toFixed(2)
}

export const CalcTotalPoint = (
  avgMath,
  avgLit,
  avgEng,
  avgPhysic,
  avgChem,
  avgBio,
  avgCiv,
  avgTech,
  avgGeo,
  avgHis,
  avgItt,
  avgDnu
) => {
  let point = 0

  point =
    (2 * (+avgMath + +avgLit + +avgEng) +
      +avgPhysic +
      +avgChem +
      +avgBio +
      +avgCiv +
      +avgTech +
      +avgGeo +
      +avgHis +
      +avgItt +
      +avgDnu) /
    15

  return point.toFixed(2)
}
