    document.addEventListener('DOMContentLoaded', () => {
        // Add necessary CSS dynamically
        const style = document.createElement('style');
        style.textContent = `
            .p-team_expand {
                display: -webkit-box;
                -webkit-line-clamp: 18; /* Number of lines to show in collapsed state */
                -webkit-box-orient: vertical;
                overflow: hidden;
                //transition: max-height 0.3s ease; /* Smooth transition for max-height */
                max-height: 0; /* Initially collapsed */
            }

            .p-team_expand.expanded {
                -webkit-line-clamp: unset; /* Remove truncation for expanded state */
                //max-height: 10000px; /* Temporarily set to a large value for smooth expansion */
            }
        `;
        document.head.appendChild(style);

        // JavaScript functionality
        const expandContainers = document.querySelectorAll('.p-team_expand');
        const readMoreButtons = document.querySelectorAll('.is-read-more');
        const showLessButtons = document.querySelectorAll('.is-show-less');

        expandContainers.forEach((container, index) => {
            const readMoreButton = readMoreButtons[index];
            const showLessButton = showLessButtons[index];

            // Set max-height dynamically based on content height
            const contentHeight = container.scrollHeight; // Get the natural content height
            container.style.maxHeight = `${contentHeight}px`; // Set max-height to the natural content height initially

            // Expand functionality
            readMoreButton.addEventListener('click', () => {
                container.classList.add('expanded'); // Add expanded class
                readMoreButton.style.display = 'none'; // Hide "Read More" button
                showLessButton.style.display = 'block'; // Show "Show Less" button

                // Set max-height to auto for expanded content
                setTimeout(() => {
                    container.style.maxHeight = 'none'; // Set max-height to 'none' to let content expand freely
                }); // Add a delay for smooth transition (there was a ', 300' between } and );)
            });

            // Collapse functionality with scroll to top
            showLessButton.addEventListener('click', () => {
                container.classList.remove('expanded'); // Remove expanded class
                showLessButton.style.display = 'none'; // Hide "Show Less" button
                readMoreButton.style.display = 'block'; // Show "Read More" button

                // Collapse the container back to the initial state
                container.style.maxHeight = `${contentHeight}px`; // Set back to initial content height

                // Scroll to the top of the container
                container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    });