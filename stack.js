// Arrays Page JavaScript Logic
class StackPage {
    constructor() {
        this.init();
    }

    init() {
        this.addEventListeners();
        this.addAccessibilityFeatures();
        this.handleKeyboardNavigation();
        this.handleResponsiveLayout();
        window.addEventListener('resize', () => this.handleResponsiveLayout());
    }

    addEventListeners() {
        // Add click effects to question cards
        const questionCards = document.querySelectorAll('.question-card');
        questionCards.forEach(card => {
            card.addEventListener('click', (e) => this.handleQuestionClick(e, card));
            card.addEventListener('mouseenter', (e) => this.handleQuestionHover(e, card, true));
            card.addEventListener('mouseleave', (e) => this.handleQuestionHover(e, card, false));
        });

        // Add click handler to logo for navigation back
        const collegeLogo = document.querySelector('.college-logo');
        if (collegeLogo) {
            collegeLogo.addEventListener('click', () => this.navigateToMain());
            collegeLogo.style.cursor = 'pointer';
        }

        // Add click handler to dashboard nav
        const navItem = document.querySelector('.nav-item');
        if (navItem) {
            navItem.addEventListener('click', () => this.navigateToMain());
            navItem.style.cursor = 'pointer';
        }
    }

    handleQuestionClick(event, card) {
        const questionId = card.getAttribute('data-question');
        const questionText = card.querySelector('span').textContent;
        
        // Add visual feedback
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);
        
        this.showQuestionModal(questionText, questionId);
    }

    handleQuestionHover(event, card, isEntering) {
        if (isEntering) {
            card.style.opacity = '0.9';
            card.style.transform = 'translateY(-2px)';
        } else {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    }

    showQuestionModal(questionText, questionId) {
        const questionData = this.getQuestionData(questionId);
        
        const modal = this.createModal({
            title: 'Stack Question',
            questionText: questionText,
            description: questionData.description,
            complexity: questionData.complexity,
            examples: questionData.examples,
            url: questionData.url
        });
        
        document.body.appendChild(modal);
    }

    getQuestionData(questionId) {
        const questionsData = {
            'is-valid': {
                description: 'You are given a string s consisting of the following characters: \'(\', \')\', \'{\', \'}\', \'[\' and \']\'. The input string s is valid if and only if: 1.Every open bracket is closed by the same type of close bracket. 2. Open brackets are closed in the correct order. 3.Every close bracket has a corresponding open bracket of the same type. Return true if s is a valid string, and false otherwise.',
                complexity: 'Easy',
                examples: [ 'Input: s = "[]" → Output: true', 'Input: s = "[(])" Output: false']
            },
            'is-valid-solution-optimal': {
                description: 'Optimal solution with stack. Time complexity: O(n)',
                complexity: 'Solution',
                examples: [],
                url: 'https://leetcode.com/problems/valid-parentheses/'
            }
        };
        
        return questionsData[questionId] || {
            description: 'Question details coming soon...',
            complexity: 'Unknown',
            examples: [],
            url: ''
        };
    }

    createModal(config) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        
        const examplesHtml = config.examples.map(example => 
            `<li class="example-item">${example}</li>`
        ).join('');
        
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${config.title}</h3>
                    <span class="complexity-badge ${config.complexity.toLowerCase()}">${config.complexity}</span>
                </div>
                <div class="modal-body">
                    <h4>${config.questionText}</h4>
                    <p class="question-description">${config.description}</p>
                    ${config.examples.length > 0 ? `
                        <div class="examples-section">
                            <h5>Examples:</h5>
                            <ul class="examples-list">${examplesHtml}</ul>
                        </div>
                    ` : ''}
                </div>
                <div class="modal-footer">
                    <button onclick="this.closest('.modal-overlay').remove()" class="modal-btn primary">
                        Close
                    </button>
                    ${config.complexity === 'Solution' && config.url ? `
                        <button onclick="window.open('${config.url}', '_blank')" class="modal-btn secondary">
                            View Solution
                        </button>
                    ` : `
                        
                    `}
                </div>
            </div>
        `;
        
        this.styleQuestionModal(modal);
        
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        return modal;
    }

    styleQuestionModal(modal) {
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.cssText = `
            background: white;
            border-radius: 12px;
            max-width: 600px;
            max-height: 80vh;
            margin: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            overflow-y: auto;
        `;
        
        // Style modal sections
        const header = modal.querySelector('.modal-header');
        if (header) {
            header.style.cssText = `
                padding: 20px 30px 10px;
                border-bottom: 1px solid #e0e0e0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            `;
        }
        
        const body = modal.querySelector('.modal-body');
        if (body) {
            body.style.cssText = `
                padding: 20px 30px;
            `;
        }
        
        const footer = modal.querySelector('.modal-footer');
        if (footer) {
            footer.style.cssText = `
                padding: 10px 30px 20px;
                display: flex;
                gap: 10px;
                justify-content: flex-end;
            `;
        }
        
        // Style buttons
        const primaryBtn = modal.querySelector('.modal-btn.primary');
        if (primaryBtn) {
            primaryBtn.style.cssText = `
                background: #2b5ce6;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
            `;
        }
        
        const secondaryBtn = modal.querySelector('.modal-btn.secondary');
        if (secondaryBtn) {
            secondaryBtn.style.cssText = `
                background: transparent;
                color: #2b5ce6;
                border: 2px solid #2b5ce6;
                padding: 8px 18px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
            `;
        }
        
        // Style complexity badge
        const complexityBadge = modal.querySelector('.complexity-badge');
        if (complexityBadge) {
            let badgeColor = '#28a745'; // Default green for easy
            if (complexityBadge.textContent.toLowerCase().includes('solution')) {
                badgeColor = '#6c757d'; // Gray for solutions
            }
            
            complexityBadge.style.cssText = `
                background: ${badgeColor};
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
            `;
        }
    }

    addAccessibilityFeatures() {
        const questionCards = document.querySelectorAll('.question-card');
        questionCards.forEach(card => {
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }

    handleKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key to close modals or go back
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal-overlay');
                if (modal) {
                    modal.remove();
                } else {
                    this.navigateToMain();
                }
            }
        });
    }

    handleResponsiveLayout() {
        const width = window.innerWidth;
        const sidebar = document.querySelector('.sidebar');
        const appContainer = document.querySelector('.app-container');
        
        if (width <= 768) {
            // Mobile layout adjustments
            if (appContainer) {
                appContainer.style.flexDirection = 'column';
            }
            if (sidebar) {
                sidebar.style.width = '100%';
            }
        } else {
            // Desktop layout restoration
            if (appContainer) {
                appContainer.style.flexDirection = 'row';
            }
            if (sidebar) {
                sidebar.style.width = '200px';
            }
        }
    }

    navigateToMain() {
        window.location.href = 'main.html';
    }

}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new StackPage();
});