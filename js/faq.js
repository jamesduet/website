const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const accordionItem = header.parentElement;
    const accordionBody = accordionItem.querySelector('.accordion-body');

    // Toggle active class for the clicked item
    const isActive = accordionItem.classList.contains('active');

    if (isActive) {
      closeAccordion(accordionBody);
    } else {
      openAccordion(accordionBody);
    }

    // Toggle the active class for the current item
    accordionItem.classList.toggle('active');
  });
});

function openAccordion(body) {
  // Set height to the scrollHeight to enable transition
  body.style.height = body.scrollHeight + 22 + 'px';
  body.style.opacity = 1;
}

function closeAccordion(body) {
  // Set height to 0 to collapse the accordion
  body.style.height = 0;
  body.style.opacity = 0;
}
