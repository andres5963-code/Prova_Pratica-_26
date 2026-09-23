const navigationButton = document.querySelector('.navigation-toggle');
const navigationPanel = document.querySelector('.navigation-panel');

const mobileMedia = window.matchMedia('(max-width: 808px)');

const supportsNavigation =
    'popover' in HTMLElement.prototype;


function updateNavigationLayout() {

    if (mobileMedia.matches) {

        // MOBILE
        navigationPanel.setAttribute('popover', 'auto');

        navigationButton.setAttribute(
            'popovertarget',
            navigationPanel.id
        );

        navigationButton.hidden = false;

    } else {

        // DESKTOP
        navigationPanel.removeAttribute('popover');

        navigationButton.removeAttribute('popovertarget');

        navigationButton.hidden = true;
    }
}


/* Controlliamo se il browser supporta Popover */

if (supportsNavigation) {

    updateNavigationLayout();

} else {

    // Se il browser non supporta Popover,
    // mostriamo comunque il menu.

    navigationPanel.removeAttribute('popover');

    navigationButton.hidden = true;
}


/* Quando cambia la dimensione dello schermo */

mobileMedia.addEventListener('change', updateNavigationLayout);


/* Quando clicco un link del menu */

navigationPanel.addEventListener('click', function(event) {

    const link = event.target.closest('a[href^="#"]');

    if (!link) return;

    const target = document.getElementById(
        link.hash.slice(1)
    );

    if (!target) return;


    // Se siamo su mobile e il popover è aperto,
    // lo chiudiamo dopo aver cliccato.

    if (
        supportsNavigation &&
        navigationPanel.matches(':popover-open')
    ) {

        navigationPanel.hidePopover();

    }

});