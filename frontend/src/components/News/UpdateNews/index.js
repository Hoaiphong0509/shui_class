import { yupResolver } from '@hookform/resolvers/yup'
import HtmlEditor, {
  Item,
  MediaResizing,
  Toolbar
} from 'devextreme-react/html-editor'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addClassnews, addParentnews } from 'services/redux/actions/teacher'
import * as yup from 'yup'
import s from './styles.module.scss'

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt']
const fontValues = [
  'Arial',
  'Courier New',
  'Georgia',
  'Impact',
  'Lucida Console',
  'Tahoma',
  'Times New Roman',
  'Verdana'
]
const headerValues = [false, 1, 2, 3, 4, 5]

const UpdateNews = ({ asNews, news, addClassnews, addParentnews }) => {
  const { title, text } = news
  console.log("news",news);
  const history = useHistory()
  const schema = yup.object({
    title: yup.string().required('Tiêu đề không được bỏ trống'),
    text: yup.string().required('Nội dung không được bỏ trống')
  })
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  function renderTexTContent({ field }) {
    function valueChanged(e) {
      field.onChange(e)
    }

    return (
      <>
        <HtmlEditor
          defaultValue={text}
          onValueChange={valueChanged}
          className={s.editor}
        >
          <MediaResizing enabled={false} />
          <Toolbar multiline={true}>
            <Item name="undo" />
            <Item name="redo" />
            <Item name="separator" />
            <Item name="size" acceptedValues={sizeValues} />
            <Item name="font" acceptedValues={fontValues} />
            <Item name="separator" />
            <Item name="bold" />
            <Item name="italic" />
            <Item name="strike" />
            <Item name="underline" />
            <Item name="separator" />
            <Item name="alignLeft" />
            <Item name="alignCenter" />
            <Item name="alignRight" />
            <Item name="alignJustify" />
            <Item name="separator" />
            <Item name="orderedList" />
            <Item name="bulletList" />
            <Item name="separator" />
            <Item name="header" acceptedValues={headerValues} />
            <Item name="separator" />
            <Item name="color" />
            <Item name="background" />
            <Item name="separator" />
            <Item name="link" />
            <Item name="image" />
            <Item name="separator" />
            <Item name="clear" />
            <Item name="codeBlock" />
            <Item name="blockquote" />
            <Item name="separator" />
            <Item name="insertTable" />
            <Item name="deleteTable" />
            <Item name="insertRowAbove" />
            <Item name="insertRowBelow" />
            <Item name="deleteRow" />
            <Item name="insertColumnLeft" />
            <Item name="insertColumnRight" />
            <Item name="deleteColumn" />
          </Toolbar>
        </HtmlEditor>
      </>
    )
  }

  const onSubmit = (data) => {
    switch (asNews) {
      case 'class':
        addClassnews(data)
        history.push('/classnews')
        break
      case 'parent':
        addParentnews(data)
        history.push('/parentnews')
        break
      default:
        break
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <div className={s.panel}>
        <label htmlFor="title">Tiêu đề bản tin/thông báo</label>
        <input
          name="title"
          defaultValue={title}
          id="title"
          {...register('title')}
        />
        <p className={s.textError}>{errors.title?.message}</p>
      </div>
      <div className={s.panel}>
        <label htmlFor="title">Tiêu đề bản tin/thông báo</label>
        <Controller name="text" control={control} render={renderTexTContent} />
        <p className={s.textError}>{errors.text?.message}</p>
      </div>
      <div className={s.btn}>
        <Button variant="secondary" onClick={() => history.push('/')}>
          Quay về
        </Button>
        <Button variant="info" type="submit">
          Lưu bản tin
        </Button>
      </div>
    </form>
  )
}

UpdateNews.prototype = {
  addClassnews: PropTypes.func,
  addParentnews: PropTypes.func
}

export default connect(null, {
  addClassnews,
  addParentnews
})(UpdateNews)
