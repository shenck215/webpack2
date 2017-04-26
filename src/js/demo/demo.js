import '../../css/demo/demo';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap';
import 'bootstrap/dist/js/bootstrap';
import meImg from '../../images/demo/me';

$(() => {

    $('.view .me_img').attr('src',meImg);

    $('.j_click').on('click',() => {
        alert('点个毛');
    });

})
