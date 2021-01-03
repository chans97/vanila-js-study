const App = () => {
    const controlsDiv = document.getElementById("controls");
    const inputlist = controlsDiv.querySelectorAll("input");
    const inputlists = controlsDiv.getElementsByTagName("input");
    // getElementsByTagName를 통해서 얻은 DOM list는 foreach 사용 불가 

    function update() {
        const unit = this.dataset.sizing || '';
        document.documentElement.style.setProperty(`--${this.name}`, this.value + unit);
    }

    inputlist.forEach(input => input.addEventListener('change', update));
    inputlist.forEach(input => input.addEventListener('mousemove', update));
}

window.onload = App;
// onload가 App() 하면 즉시 실행, window.onload = App으로 실행
//window.addEventListener('DOMContentLoaded', App)