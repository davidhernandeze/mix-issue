import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Skeleton from 'primevue/skeleton'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toolbar from 'primevue/toolbar'
import FileUpload from 'primevue/fileupload'
import Rating from 'primevue/rating'
import Textarea from 'primevue/textarea'
import RadioButton from 'primevue/radiobutton'
import InputNumber from 'primevue/inputnumber'

export default function(app) {
    app.component('Dialog', Dialog)
    app.component('DataTable', DataTable)
    app.component('Column', Column)
    app.component('Skeleton', Skeleton)
    app.component('Button', Button)
    app.component('InputText', InputText)
    app.component('Toolbar', Toolbar)
    app.component('FileUpload', FileUpload)
    app.component('Rating', Rating)
    app.component('Textarea', Textarea)
    app.component('RadioButton', RadioButton)
    app.component('InputNumber', InputNumber)
}
