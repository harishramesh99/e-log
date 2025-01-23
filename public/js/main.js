document.addEventListener('DOMContentLoaded', () => {
    const dropdownButtons = document.querySelectorAll('.dropbtn');

    dropdownButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = button.nextElementSibling;

            console.log('clicked dropdown');

            // Close all other dropdowns
            document.querySelectorAll('.dropdown-content').forEach((content) => {
                if (content !== dropdown) {
                    content.classList.remove('visible');
                    console.log('closing dropdown');
                }
            });

            // Toggle visibility of the current dropdown
            dropdown.classList.toggle('visible');
            e.stopPropagation();
            console.log('toggling dropdown');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown-content').forEach((content) => {
            content.classList.remove('visible');
            console.log('closing dropdown');
        });
    });
});
