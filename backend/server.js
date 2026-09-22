<!DOCTYPE html>
<html>
<head>
<title>GoBus - Ticket Booking</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Segoe UI}
body{background:#f1f5f9}
header{background:#0f172a;color:#fff;padding:15px 20px;display:flex;justify-content:space-between}
.hero{padding:40px 20px;text-align:center;background:white}
.search-box{max-width:800px;margin:20px auto;background:white;padding:20px;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.1);display:flex;gap:10px;flex-wrap:wrap}
.search-box input, .search-box button{padding:12px;border-radius:8px;border:1px solid #ddd;flex:1}
.search-box button{background:#2563eb;color:white;border:none;cursor:pointer;font-weight:bold}
.bus-list{max-width:800px;margin:auto;padding:20px}
.bus-card{background:white;padding:15px;margin-bottom:15px;border-radius:10px;display:flex;justify-content:space-between;align-items:center}
.seat{width:35px;height:35px;border:1px solid #2563eb;margin:3px;display:inline-flex;justify-content:center;align-items:center;border-radius:5px;cursor:pointer}
.seat.booked{background:#cbd5e1;cursor:not-allowed}
.seat.selected{background:#2563eb;color:white}
</style>
</head>
<body>
<header><h2>GoBus 🚌</h2><span id="user">Guest</span></header>
<div class="hero"><h1>Book Bus Tickets Instantly</h1><p>Ghatkesar to Hyderabad, Vijayawada & more</p></div>

<div class="search-box">
<input id="from" placeholder="From (ex: Ghatkesar)">
<input id="to" placeholder="To (ex: Hyderabad)">
<input id="date" type="date">
<button onclick="searchBus()">Search Buses</button>
</div>

<div class="bus-list" id="busList"></div>
<div class="bus-list" id="seatArea" style="display:none"></div>

<script>
const buses = [
{id:1,name:"Orange Travels",from:"Ghatkesar",to:"Hyderabad",time:"06:30 AM",price:250,seats:36},
{id:2,name:"SRS Travels",from:"Ghatkesar",to:"Vijayawada",time:"08:00 PM",price:550,seats:36},
{id:3,name:"Garuda",from:"Hyderabad",to:"Ghatkesar",time:"05:00 PM",price:250,seats:36}
];
let selectedBus=null, selectedSeats=[];

function searchBus(){
  const f=document.getElementById('from').value.toLowerCase();
  const t=document.getElementById('to').value.toLowerCase();
  const filtered = buses.filter(b => b.from.toLowerCase().includes(f) && b.to.toLowerCase().includes(t));
  let html = filtered.length? "" : "<p>No buses found. Try Ghatkesar to Hyderabad</p>";
  filtered.forEach(b=>{
    html+=`<div class="bus-card"><div><b>${b.name}</b><br>${b.from} -> ${b.to} | ${b.time}<br>₹${b.price}</div><button onclick="showSeats(${b.id})" style="padding:8px 15px;background:#2563eb;color:white;border:none;border-radius:6px;cursor:pointer">View Seats</button></div>`;
  });
  document.getElementById('busList').innerHTML=html;
}

function showSeats(id){
  selectedBus = buses.find(b=>b.id==id); selectedSeats=[];
  let html=`<h3>${selectedBus.name} - Select Seats</h3><div style="margin:15px 0">`;
  for(let i=1;i<=selectedBus.seats;i++){
    html+=`<div class="seat" onclick="toggleSeat(this,${i})">${i}</div>`;
    if(i%6==0) html+="<br>";
  }
  html+=`</div><p>Selected: <span id="selCount">0</span> | Total: ₹<span id="total">0</span></p><button onclick="book()" style="padding:10px 20px;background:green;color:white;border:none;border-radius:8px;cursor:pointer">Confirm Booking</button>`;
  const area=document.getElementById('seatArea'); area.style.display='block'; area.innerHTML=html;
  window.scrollTo(0, area.offsetTop);
}
function toggleSeat(el,num){
  if(el.classList.contains('selected')){el.classList.remove('selected');selectedSeats=selectedSeats.filter(s=>s!=num);}
  else{el.classList.add('selected');selectedSeats.push(num);}
  document.getElementById('selCount').innerText=selectedSeats.length;
  document.getElementById('total').innerText=selectedSeats.length*selectedBus.price;
}
function book(){
  if(selectedSeats.length==0) return alert("Select at least 1 seat");
  alert(`Booking Success!\nBus: ${selectedBus.name}\nSeats: ${selectedSeats.join(',')}\nTotal: ₹${selectedSeats.length*selectedBus.price}`);
  document.getElementById('seatArea').style.display='none';
}
searchBus();
</script>
</body>
</html>