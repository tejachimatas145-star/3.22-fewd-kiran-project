// Smooth scrolling + active nav highlights + simple contact form validation
document.addEventListener('DOMContentLoaded', function(){
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link=>{
    link.addEventListener('click', function(e){
      e.preventDefault();
      const id = this.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if(el){
        el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  const sections = document.querySelectorAll('main section[id]');
  const options = {root:null, rootMargin:'-40% 0px -40% 0px', threshold:0};
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const id = entry.target.id;
      const link = document.querySelector('.nav-link[href="#'+id+'"]');
      if(entry.isIntersecting){
        document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active'));
        if(link) link.classList.add('active');
      }
    });
  }, options);
  sections.forEach(s=>obs.observe(s));

  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if(!name || !email || !message){
      status.textContent = 'Please fill all required fields.';
      status.style.color = 'crimson';
      return;
    }
    if(!/\S+@\S+\.\S+/.test(email)){
      status.textContent = 'Please enter a valid email address.';
      status.style.color = 'crimson';
      return;
    }
    status.textContent = 'Message sent — thanks! (Demo mode)';
    status.style.color = 'green';
    form.reset();
  });
});