const btn = document.getElementById("add");
let task = document.getElementById("task");

let key = [];

for (let i = 0; i < localStorage.length; i++) {
    key.push(localStorage.key(i));
}

if (key.length != 0) {
    key.sort((a, b) => {
        return a - b;
    });
}

for (let i in key) {
    let value = localStorage.getItem(key[i]);
    task.insertAdjacentHTML('beforeend', value);
}

btn.addEventListener('click', () => {
    let count = localStorage.length + 1;
    let input_text = document.getElementById("text").value;
    text = input_text.trim();
    if (text !== "") {
        let task_text = `<div class="border-t-2 border-black py-2 bg-blue-100 space-y-2 flex items-center justify-evenly px-2 space-x-4"><div class="text-[#ff4700] h-fit w-[50%] font-medium 2xl:text-lg text-pretty md:text-lg">🔰 ${text}</div><div class="flex space-x-4"><div><button class="bg-orange-500 hover:bg-orange-600 px-2 py-1 rounded-md font-medium 2xl:text-xl" onclick = "finished(event)">Finished</button><button class=" hidden px-2 py-1 rounded-md font-medium 2xl:text-xl bg-green-500 hover:bg-green-600" onclick = "unmark(event)">Un Mark</button></div><div><button class="bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md font-medium 2xl:text-xl" onclick = "deleted(event)">Delete<button></div></div>`;
        document.getElementById("text").value = "";
        let ele = document.createElement("div");
        let inserted = 0;
        for (let i = 0; i < localStorage.length; i++) {
            let k = localStorage.key(i);
            let item = localStorage.getItem(k);
            ele.innerHTML = item;
            let ele_text = ele.firstElementChild.firstElementChild.innerText;
            if (ele_text == `🔰 ${text}`) {
                inserted = 1;
            }
        }
        if (inserted == 0) {
            localStorage.setItem(count, task_text);
            task.insertAdjacentHTML('beforeend', task_text);
        }
    }
});

document.body.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        let count = localStorage.length + 1;
        let input_text = document.getElementById("text").value;
        text = input_text.trim();
        if (text !== "") {
            let task_text = `<div class="border-t-2 border-black py-2 bg-blue-100 space-y-2 flex items-center justify-evenly px-2 space-x-4"><div class="text-[#ff4700] h-fit w-[50%] font-medium 2xl:text-lg text-pretty md:text-lg">🔰 ${text}</div><div class="flex space-x-4"><div><button class="bg-orange-500 hover:bg-orange-600 px-2 py-1 rounded-md font-medium 2xl:text-xl" onclick = "finished(event)">Finished</button><button class="px-2 py-1 rounded-md font-medium 2xl:text-xl bg-green-500 hover:bg-green-600 hidden" onclick = "unmark(event)">Un Mark</button></div><div><button class="bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md font-medium 2xl:text-xl" onclick = "deleted(event)">Delete<button></div></div>`;
            document.getElementById("text").value = "";
            let ele = document.createElement("div");
            let inserted = 0;
            for (let i = 0; i < localStorage.length; i++) {
                let k = localStorage.key(i);
                let item = localStorage.getItem(k);
                ele.innerHTML = item;
                let ele_text = ele.firstElementChild.firstElementChild.innerText;
                if (ele_text == `🔰 ${text}`) {
                    inserted = 1;
                }
            }
            if (inserted == 0) {
                localStorage.setItem(count, task_text);
                task.insertAdjacentHTML('beforeend', task_text);
            }
        }
    }
});


const deleted = (event) => {
    let commit = confirm("Do You Want To Delete This Task!");
    if (commit) {
        let del = event.currentTarget.parentNode.parentNode.parentNode;
        let task_text = del.firstElementChild.innerText;
        let element = document.createElement("div");
        for (let i = 0; i < localStorage.length; i++) {
            let k = localStorage.key(i);
            let item = localStorage.getItem(k);
            element.innerHTML = item;
            let element_text = element.firstElementChild.firstElementChild.innerText;
            if (task_text == element_text) {
                del.remove();
                localStorage.removeItem(k);
            }
        }

    }
}

const finished = (e) => {
    let apply = e.currentTarget;
    let next = apply.nextSibling;
    apply.style.display = "none";
    let finish = e.currentTarget.parentNode.parentNode.parentNode.firstElementChild;
    finish.style.color = "#16b01e";
    next.style.display = "block";
    let text = finish.innerText;
    let element = document.createElement("div");
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let item = localStorage.getItem(key);
        element.innerHTML = item;
        let element_text = element.firstElementChild.firstElementChild.innerText;
        if (element_text == text) {
            localStorage.removeItem(key);
            let update = finish.parentNode.outerHTML;
            localStorage.setItem(key, update);
        }
    }
}
const unmark = (e) => {
    let apply = e.currentTarget;
    let previous = apply.previousSibling;
    apply.style.display = "none";
    let finish = e.currentTarget.parentNode.parentNode.parentNode.firstElementChild;
    finish.style.color = "#e27109";
    previous.style.display = "block";
    let text = finish.innerText;
    let element = document.createElement("div");
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let item = localStorage.getItem(key);
        element.innerHTML = item;
        let element_text = element.firstElementChild.firstElementChild.innerText;
        if (element_text == text) {
            localStorage.removeItem(key);
            let update = finish.parentNode.outerHTML;
            localStorage.setItem(key, update);
        }
    }
}
