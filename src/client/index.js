import { perform } from './js/app';




import './styles/style.scss'
import './styles/normalize.scss'

window.addEventListener('DOMContentLoaded',()=>{

    const submit = document.getElementById('generate');
    submit.addEventListener('click',perform);
    


})

