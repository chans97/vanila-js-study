const App = () => {
    const controlsDiv = document.getElementById("controls");
    const inputlist = controlsDiv.querySelectorAll("input");
    // const inputlist = controlsDiv.getElementsByTagName("input");
    // getElementsByTagName를 통해서 얻은 DOM list는 foreach 사용 불가 

    function update() {
        const unit = this.dataset.sizing || '';
        document.documentElement.style.setProperty(`--${this.name}`, this.value + unit);
    }

    inputlist.forEach(input => input.addEventListener('change', update));
    inputlist.forEach(input => input.addEventListener('mousemove', update));
}

// window.onload = App();
// onload가 분명 더 나중에 실행해야하는데 받아오지 못한다는 문제가 발생 원인불명 

window.addEventListener('DOMContentLoaded', App)