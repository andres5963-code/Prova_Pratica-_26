const navigationButton = document.querySelector('.navigation-toggle');
const navigationPanel = document.querySelector('.navigation-panel');

const mobileMedia = window.matchMedia('(max-width: 808px)');

const supportsNavigation =
    'popover' in HTMLElement.prototype;


function updateNavigationLayout() {

    if (mobileMedia.matches) {

        
        navigationPanel.setAttribute('popover', 'auto');

        navigationButton.setAttribute(
            'popovertarget',
            navigationPanel.id
        );

        navigationButton.hidden = false;

    } else {

        
        navigationPanel.removeAttribute('popover');

        navigationButton.removeAttribute('popovertarget');

        navigationButton.hidden = true;
    }
}



if (supportsNavigation) {

    updateNavigationLayout();

} else {


    navigationPanel.removeAttribute('popover');

    navigationButton.hidden = true;
}


mobileMedia.addEventListener('change', updateNavigationLayout);



navigationPanel.addEventListener('click', function(event) {

    const link = event.target.closest('a[href^="#"]');

    if (!link) return;

    const target = document.getElementById(
        link.hash.slice(1)
    );

    if (!target) return;


    if (
        supportsNavigation &&
        navigationPanel.matches(':popover-open')
    ) {

        navigationPanel.hidePopover();

    }

});

const tabs = document.querySelectorAll(".tab");
const buttons = document.querySelectorAll(".tab-button");

buttons.forEach((button, index) => {

    button.addEventListener("click", () => {

        tabs.forEach(tab => {
            tab.classList.remove("is-selected");
        });

        tabs[index].classList.add("is-selected");

    });

});