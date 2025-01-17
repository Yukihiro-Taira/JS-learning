const projectData = [
    {title: "Euphoria",image: "/assets/1.jpg", isAlternate: false},
    {title: "Scratcher",image: "/assets/2.jpg", isAlternate: true},
    {title: "Ember",image: "/assets/3.jpg", isAlternate: false},
    {title: "Luquid Soleil",image: "/assets/4.jpg", isAlternate: true},
    {title: "Vacuum",image: "/assets/5.jpg", isAlternate: false},
    {title: "Synthesis",image: "/assets/6.jpg", isAlternate: true},
];

const lerp = (start, end, factor) => start + ( end - start ) * factor;

const config = {
    scrollSpeed: 0.75,
    lerpFactor: 0.05,
    bufferSize: 15,
    cleanupThreshold: 50,
    maxVel: 120,
    snapDuration: 500,
};

const state = {
    currentY: 0,
    targetY: 0,
    lastY: 0,
    scrollVel: 0,
    isDragging: false,
    startY: 0,
    projects: new Map(),
    parallaxImg: new Map(),
    projectHeight: window.innerHeight,
    isSnapping: false,
    snapStartTime: 0,
    snapStartY: 0,
    snapTragetY: 0,
    lastScrollTime: Date.now(),
    isScrolling: false,
};

const createParallaxImg = (imageElement) =>{
    let bounds = null;
    let currentTranslateY = 0;
    let targetTranslateY = 0;

    const updateBounds = () => {
        if (imageElement) {
            const rect = imageElement.getBoundingClientRect();
            bounds = {
                top: rect.top + window.scrollY,
                bottom: rect.bottom + window.scrollY,
            };
        }
    };




const update = (scroll) =>{
    if(!bounds)return;
    const relativeScroll = -scroll - bounds.top;
    targetTranslateY = relativeScroll * 0.2;
    currentTranslateY = lerp(currentTranslateY, targetTranslateY, 0.1);

    if(Math.abs(currentTranslateY - targetTranslateY) > 0.01){
        imageElement.style.transform = `translateY(${currentTranslateY}px) scale(1.5)`;
    }

};

updateBounds();
return {update, updateBounds};
};


const getProjectData =(index) => {
    const dataIndex = 
        ((Math.abs(index)% projectData.length) + projectData.length) % projectData.length;
    return projectData[dataIndex];
};

const createProjectElement = (index) =>{
    if(state.projects.has(index)) return;

    const template = document.querySelector(".project-template");
    const project = template.cloneNode(true);
    project.style.display = "flex";
    project.classList.remove("template");

    const dataIndex = 
    ((Math.abs(index)% projectData.length) + projectData.length) % projectData.length;
    const data =getProjectData(index);
    const projectNumber = (dataIndex +1).toString().padStart(2,"0");

    project.innerHTML = data.isAlternate
        ?`<div class="side">
            <div class="img"><img src="${data.image}" alt="${data.title}" /></div>
            </div>
            <div class="side">
                <div class="title">
                    <h1>${data.title}</h1>
                    <h1>${projectNumber}</h1>
                </div>
            </div>`
       :`<div class="side">
            <div class="title">
                <h1>${data.title}</h1>
                <h1>${projectNumber}</h1>
            </div>
        </div>
        <div class="side">
            <div class="img"><img src="${data.image}" alt="${data.title}" /></div>
        </div>`;


    project.style.transform = `translateY(${index * state.projectHeight}px)`;
    document.querySelector(".project-list").appendChild(project);
    state.projects.set(index, project);

    const img = project.querySelector("img");
    if (img) {
        state.parallaxImg.set(index,createParallaxImg(img));
    }
};

const createInitialProjects = () => {
    for (let i = -config.bufferSize; i <= config.bufferSize; i++){
        createProjectElement(i);
    }
};

const getCurrentIndex = () => Math.round(-state.targetY / state.projectHeight);

const checkAndCreateProjects = () => {
    const currentIndex = getCurrentIndex();
    const minNeeded = currentIndex - config.bufferSize;
    const maxNeeded = currentIndex + config.bufferSize;

    for(let i = minNeeded;i <= maxNeeded; i++){
        if(!state.projects.has(i)){
            createProjectElement(i);
        }
    }

    state.projects.forEach((projects, index)=>{
        if(
            index < currentIndex - config.cleanupThreshold ||
            index > currentIndex + config.cleanupThreshold
        ){
            projects.remove();
            state.projects.delete(index);
            state.parallaxImg.delete(index);
        }
    });
};


const getClosestSnapPoint = () => {
    const currentIndex = Math.round(-state.targetY / state.projectHeight);
    return -currentIndex * state.projectHeight;
    
};

const initSnap = () =>{
    state.isSnapping = true;
    state.snapStartTime = Date.now();
    state.snapStartY = state.targetY;
    state.snapTragetY = getClosestSnapPoint();
    
};

const updateSnap = () =>{
    const elapsed = Date.now() - state.snapStartTime;
    const progress = Math.min(elapsed / config.snapDuration, 1);

    const t = 1 - Math.pow(1 - progress, 3);

    state.targetY= state.snapStartY + (state.snapTragetY - state.snapStartY) * t;

    if(progress >= 1){
        state.isSnapping = false;
        state.targetY = state.snapTragetY;
    }
}

const animate = () =>{
    const now = Date.now();
    const timeSinceLastScroll = now - state.lastScrollTime;

    if(!state.isSnapping && !state.isDragging && timeSinceLastScroll > 100) {
        const snapPoint = getClosestSnapPoint();
        if(Math.abs(state.targetY - snapPoint) > 1){
            initSnap();
        }
    }

    if(state.isSnapping) {
        updateSnap();
    }

    if(!state.isDragging ){
        state.currentY += (state.targetY - state.currentY) * config.lerpFactor;
    }

    checkAndCreateProjects();


    state.projects.forEach((project, index) => {
        const y = index *state.projectHeight + state.currentY;
        project.style.transform =`translateY${y}px)`;

        const parallaxImage = state.parallaxImg.get(index);
        if (parallaxImage){
            parallaxImage.update(state.currentY);
        }
    });

    requestAnimationFrame(animate);
}

const handleWheel = (e) =>{
    e.preventDefault();
    state.isSnapping = false;
    state.lastScrollTime + Date.now();

    const scrollDelta = e.deltaY * config.scrollSpeed;
    state.targetY-= Math.max(
        Math.min(scrollDelta, config.maxVel),
        -config.maxVel
    )
}

const handleTouchStart = (e) =>{
    state.isDragging = true;
    state.isSnapping = false;
    state.startY =e.touches[0].clientY;
    state.lastY = state.targetY;
    state.lastScrollTime = Date.now();
}

const handleTouchMove = (e) =>{
    if(!state.isDragging) return;
    const deltaY = (e.touches[0].clientY - state.startY) *1.5;
    state.targetY = state.lastY + deltaY;
    state.lastScrollTime =Date.now();
};

const handleTouchEnd = () =>{
    state.isDragging = false;
};

const handleResize = () => {
    state.projectHeight = window.innerHeight;
    state.projects.forEach((project, index) => {
        project.style.transform = `translateY(${index * state.projectHeight}px)`;
        const parallaxImage = state.parallaxImg.get(index);
        if(parallaxImage){
            parallaxImage.updateBounds();
        }
    });
};

const initializeScroll = () =>{
    window.addEventListener("wheel", handleWheel, { passive: false});
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchstart", handleTouchEnd);
    window.addEventListener("touchstart", handleResize);

    createInitialProjects();
    animate();

};

document.addEventListener("DOMContentLoaded", initializeScroll);
