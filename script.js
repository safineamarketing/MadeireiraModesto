/**
 * Madeireira Modesto - Dynamic Interactivity & WhatsApp Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close mobile menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  // Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  // Product Category Filter (Supports both standard & minimal selectors)
  const filterBtns = document.querySelectorAll('.filter-btn, .filter-btn-minimal');
  const productCards = document.querySelectorAll('.product-card, .product-card-minimal');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all filter buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
        }
      });
    });
  });

  // Modal Functionality for Product Details
  const modalOverlay = document.getElementById('modalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalSpecs = document.getElementById('modalSpecs');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');

  window.openProductModal = function(title, description, specs, category) {
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = description;
    if (modalSpecs) modalSpecs.textContent = specs;
    
    if (modalWhatsappBtn) {
      modalWhatsappBtn.onclick = function() {
        sendWhatsAppQuote(title);
      };
    }

    if (modalOverlay) modalOverlay.classList.add('active');
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      if (modalOverlay) modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // WhatsApp Quote Link Generator
  window.sendWhatsAppQuote = function(productName = '') {
    const phoneNumber = '551936651217'; // Madeireira Modesto Official WhatsApp (19) 3665-1217
    let message = 'Olá, Madeireira Modesto! Gostaria de solicitar um orçamento';

    if (productName) {
      message += ` para o produto: *${productName}*.`;
    } else {
      message += ' de madeiras para o meu projeto.';
    }

    message += '\n\nPoderiam me passar mais informações e atendimento?';

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  // Contact Form Submission
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('formName').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const profile = document.getElementById('formProfile').value;
      const product = document.getElementById('formProduct').value;
      const messageText = document.getElementById('formMessage').value.trim();

      if (!name || !phone) {
        alert('Por favor, preencha pelo menos seu Nome e Telefone/WhatsApp para contato.');
        return;
      }

      const phoneNumber = '551936651217';
      let message = `*SOLICITAÇÃO DE ORÇAMENTO - SITE MODESTO*\n\n`;
      message += `👤 *Nome:* ${name}\n`;
      message += `📞 *Telefone:* ${phone}\n`;
      message += `🏢 *Perfil:* ${profile}\n`;
      message += `🪵 *Produto:* ${product}\n`;
      if (messageText) {
        message += `📝 *Mensagem:* ${messageText}\n`;
      }

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');
      quoteForm.reset();
    });
  }
});
