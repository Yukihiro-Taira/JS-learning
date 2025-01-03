//Movement Animation to happen
const card1 = document.querySelector("#key1");
const card2 = document.querySelector("#key2");
const card3 = document.querySelector("#key3");
const card4 = document.querySelector("#key4");
const card5 = document.querySelector("#key5");
const card6 = document.querySelector("#key6");
const card7 = document.querySelector("#key7");
const card8 = document.querySelector("#key8");
const card9 = document.querySelector("#key9");
const card10 = document.querySelector("#key10");
const card11 = document.querySelector("#key11");
const card12 = document.querySelector("#key12");
const card13 = document.querySelector("#key13");
const card14 = document.querySelector("#key14");
const card15 = document.querySelector("#key15");
const card16 = document.querySelector("#key16");
const card17 = document.querySelector("#key17");
const card = document.querySelector("#keys")
const container = document.querySelector(".container");

card1.style.transform = "translateY(440px) rotateY(90deg)";
card2.style.transform = "translateY(440px) translateX(-115px) rotateY(90deg)";
card3.style.transform = "translateY(440px) translateX(-230px) rotateY(90deg)";
card4.style.transform = "translateY(440px) translateX(-345px) rotateY(90deg)";
card5.style.transform = "translateY(330px) rotateY(90deg)";
card6.style.transform = "translateY(330px) translateX(-115px) rotateY(90deg)";
card7.style.transform = "translateY(330px) translateX(-230px) rotateY(90deg)";
card8.style.transform = "translateY(330px) translateX(-345px) rotateY(90deg)";
card9.style.transform = "translateY(220px) rotateY(90deg)";
card10.style.transform = "translateY(220px) translateX(-115px) rotateY(90deg)";
card11.style.transform = "translateY(220px) translateX(-230px) rotateY(90deg)";
card12.style.transform = "translateY(220px) translateX(-345px) rotateY(90deg)";
card13.style.transform = "translateY(110px) rotateY(90deg)";
card14.style.transform = "translateY(110px) translateX(-115px) rotateY(90deg)";
card15.style.transform = "translateY(110px) translateX(-230px) rotateY(90deg)";
card16.style.transform = "translateY(110px) translateX(-345px) rotateY(90deg)";
card17.style.transform = "translateZ(0px) rotateY(90deg)";
//Items
// const title = document.querySelector(".title");
// const sneaker = document.querySelector(".sneaker img");
// const purchase = document.querySelector(".purchase");
// const description = document.querySelector(".info h3");
// const sizes = document.querySelector(".sizes");

//Moving Animation Event
// container.addEventListener("mousemove", (e) => {
//   let xAxis = (window.innerWidth - e.pageX);
//   let yAxis = (window.innerHeight - e.pageY / 2.5);

//   card1.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card2.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card3.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card4.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card5.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card6.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card7.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card8.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card9.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card10.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card11.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card12.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card13.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card14.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card15.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card16.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
//   card17.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;

// });


//Animate In
container.addEventListener("mouseenter", (e) => {
  card.style.transition = "all 0.2 ease";
   //Popout
  card1.style.transform = "scale(0, 0)";
  card2.style.transform = "translateZ(1000px)";
  card3.style.transform = "translateZ(1000px)";
  card4.style.transform = "translateZ(1000px)";
  card5.style.transform = "translateZ(1000px)";
  card6.style.transform = "translateZ(1000px)";
  card7.style.transform = "translateZ(1000px)";
  card8.style.transform = "translateZ(1000px)";
  card9.style.transform = "translateZ(1000px)";
  card10.style.transform = "translateZ(1000px)";
  card11.style.transform = "translateZ(1000px)";
  card12.style.transform = "translateZ(1000px)";
  card13.style.transform = "translateZ(1000px)";
  card14.style.transform = "translateZ(1000px)";
  card15.style.transform = "translateZ(1000px)";
  card16.style.transform = "translateZ(1000px)";
  card17.style.transform = "translateZ(1000px)";
  card1.style.transition = "all 0.5s ease";
  card1.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card2.style.transition = "all 0.5s ease";
  card2.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card3.style.transition = "all 0.5s ease";
  card3.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card4.style.transition = "all 0.5s ease";
  card4.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card5.style.transition = "all 0.5s ease";
  card5.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card6.style.transition = "all 0.5s ease";
  card6.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card7.style.transition = "all 0.5s ease";
  card7.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card8.style.transition = "all 0.5s ease";
  card8.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card9.style.transition = "all 0.5s ease";
  card9.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card10.style.transition = "all 0.5s ease";
  card10.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card11.style.transition = "all 0.5s ease";
  card11.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card12.style.transition = "all 0.5s ease";
  card12.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card13.style.transition = "all 0.5s ease";
  card13.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card14.style.transition = "all 0.5s ease";
  card14.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card15.style.transition = "all 0.5s ease";
  card15.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card16.style.transition = "all 0.5s ease";
  card16.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card17.style.transition = "all 0.5s ease";
  card17.style.transform = `rotateY(0deg) rotateX(0deg)`;

 });
 //Animate Out
container.addEventListener("mouseleave", (e) => {
  card1.style.transition = "all 0.5s ease";
  card1.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card2.style.transition = "all 0.5s ease";
  card2.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card3.style.transition = "all 0.5s ease";
  card3.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card4.style.transition = "all 0.5s ease";
  card4.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card5.style.transition = "all 0.5s ease";
  card5.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card6.style.transition = "all 0.5s ease";
  card6.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card7.style.transition = "all 0.5s ease";
  card7.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card8.style.transition = "all 0.5s ease";
  card8.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card9.style.transition = "all 0.5s ease";
  card9.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card10.style.transition = "all 0.5s ease";
  card10.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card11.style.transition = "all 0.5s ease";
  card11.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card12.style.transition = "all 0.5s ease";
  card12.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card13.style.transition = "all 0.5s ease";
  card13.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card14.style.transition = "all 0.5s ease";
  card14.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card15.style.transition = "all 0.5s ease";
  card15.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card16.style.transition = "all 0.5s ease";
  card16.style.transform = `rotateY(0deg) rotateX(0deg)`;
  card17.style.transition = "all 0.5s ease";
  card17.style.transform = `rotateY(0deg) rotateX(0deg)`;



  //Popback
  card1.style.transform = "translateY(440px) rotateY(90deg)";
  card2.style.transform = "translateY(440px) translateX(-115px) rotateY(90deg)";
  card3.style.transform = "translateY(440px) translateX(-230px) rotateY(90deg)";
  card4.style.transform = "translateY(440px) translateX(-345px) rotateY(90deg)";
  card5.style.transform = "translateY(330px) rotateY(90deg)";
  card6.style.transform = "translateY(330px) translateX(-115px) rotateY(90deg)";
  card7.style.transform = "translateY(330px) translateX(-230px) rotateY(90deg)";
  card8.style.transform = "translateY(330px) translateX(-345px) rotateY(90deg)";
  card9.style.transform = "translateY(220px) rotateY(90deg)";
  card10.style.transform = "translateY(220px) translateX(-115px) rotateY(90deg)";
  card11.style.transform = "translateY(220px) translateX(-230px) rotateY(90deg)";
  card12.style.transform = "translateY(220px) translateX(-345px) rotateY(90deg)";
  card13.style.transform = "translateY(110px) rotateY(90deg)";
  card14.style.transform = "translateY(110px) translateX(-115px) rotateY(90deg)";
  card15.style.transform = "translateY(110px) translateX(-230px) rotateY(90deg)";
  card16.style.transform = "translateY(110px) translateX(-345px) rotateY(90deg)";
  card17.style.transform = "translateZ(0px) rotateY(90deg)";


});


