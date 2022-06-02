/** The button should have 'loading-btn' class for styling */
export function startLoading(button: HTMLButtonElement) {
	button.disabled = true;
	button.classList.add('loading');
}

/** The button should have 'loading-btn' class for styling */
export function stopLoading(button: HTMLButtonElement) {
	button.disabled = false;
	button.classList.remove('loading');
}

//Required css to add:
/*
.loading-btn {
  position: relative;
  transition: padding-right 0.3s ease-out;
}
.loading-btn.loading {
  padding-right: 36px;
}
.loading-btn.loading:after {
  content: '';
  position: absolute;
  border-radius: 100%;
  right: 6px;
  top: 50%;
  width: 0px;
  height: 0px;
  margin-top: -2px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-left-color: #fff;
  border-top-color: #fff;
  animation: spin 0.6s infinite linear, grow 0.3s forwards ease-out;
}
@keyframes spin {
  to {
    transform: rotate(359deg);
  }
}
@keyframes grow {
  to {
    width: 14px;
    height: 14px;
    margin-top: -8px;
    right: 13px;
  }
}
*/
