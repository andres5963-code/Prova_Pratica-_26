
const navigationButton = document.querySelector('.navigation-toggle');
const navigationPanel = document.querySelector('.navigation-panel');

const mobileMedia = window.matchMedia('(max-width: 807px)');
const supportsNavigation = 'popover' in HTMLElement.prototype;

function updateNavigationLayout() {
    if (!navigationButton || !navigationPanel) return;

    if (supportsNavigation && mobileMedia.matches) {
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

updateNavigationLayout();

if (supportsNavigation) {
    mobileMedia.addEventListener('change', updateNavigationLayout);
}

if (navigationPanel) {
    navigationPanel.addEventListener('click', (event) => {
        const link = event.target.closest('a[href^="#"]');

        if (!link) return;

        if (
            supportsNavigation &&
            navigationPanel.matches(':popover-open')
        ) {
            navigationPanel.hidePopover();
        }
    });
}

const tabs = document.querySelectorAll('.tab');
const images = document.querySelectorAll('.tabs-image');

tabs.forEach((tab, index) => {
    const button = tab.querySelector('.tab-button');

    if (!button) return;

    button.addEventListener('click', () => {
        tabs.forEach((item) => {
            item.classList.remove('is-selected');
        });

        tab.classList.add('is-selected');

        images.forEach((image) => {
            image.classList.remove('is-visible');
        });

        if (images[index]) {
            images[index].classList.add('is-visible');
        }
    });
});
