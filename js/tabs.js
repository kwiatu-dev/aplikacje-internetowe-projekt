const tabsPane = [...document.querySelectorAll('.nav-tabs li a')];
let activePane = document.querySelector('.tabs-content .tab-pane.active');
let activeLink = document.querySelector('.nav-tabs li a.active');

const changePane = (e) =>{
    e.preventDefault();
    const link = e.currentTarget;
    const target = link.getAttribute('href');
    const tabPane = document.querySelector(target);
    
    if(activePane && activeLink){
        activeLink.classList.remove('active');
        link.classList.add('active');
        activeLink = link;

        activePane.classList.remove('active');
        tabPane.classList.add('active');
        activePane = tabPane;

    }
}

tabsPane.forEach(item => {
    item.addEventListener('click', changePane);
})
