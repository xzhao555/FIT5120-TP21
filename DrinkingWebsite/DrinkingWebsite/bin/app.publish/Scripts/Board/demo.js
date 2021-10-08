$(function () {
    const m = new Map();
    $(function(){
        //1.提交留言
        $('.submit').click(() => {
            let name = $('.name').val();
            let msg = $('.message').val();
            m.set(name,msg);
            listShow();
        })
        
        //2.展示留言
        let listShow = () =>{
            let str = ''
            for(let [key,value] of m){
                str += `<li class="list-group-item">${key}
                            <span>说：</span>${value}
                        </li>`
            }
            $('.messageList').html(str)
        }
    })
  })