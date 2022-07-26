import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { totalByRangeWeek } from 'utils/AppUltils'
import * as yup from 'yup'
import s from './styles.module.scss'

const CompetitionByWeek = ({ comptData }) => {
  const cmmt = useSelector((state) => state.competition)
  const schema = yup.object({
    from: yup.number().default(1),
    to: yup.number().default(1)
  })
  const { register, watch } = useForm({
    resolver: yupResolver(schema)
  })


  return (
    <div>
      <div className={s.scoreAll}>
        <h2>Điểm thi đua theo tuần</h2>
        <div>
          <label>Từ tuần</label>
          <input
            type="number"
            defaultValue={1}
            step={1}
            min={1}
            max={35}
            {...register('from')}
          />
          <label>đến tuần</label>
          <input
            type="number"
            defaultValue={1}
            step={1}
            min={1}
            max={35}
            {...register('to')}
          />
        </div>
        <p>
          Trung bình:{' '}
          {cmmt &&
            totalByRangeWeek(
              isNaN(+watch('from')) ? 1 : +watch('from'),
              isNaN(+watch('to')) ? 1 : +watch('to'),
              cmmt.competitions
            )}
        </p>
        {/* <p>Xếp loại: {rangeWeek.classcifiWeek}</p> */}
      </div>
    </div>
  )
}

export default CompetitionByWeek
