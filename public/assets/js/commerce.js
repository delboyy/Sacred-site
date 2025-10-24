(function () {
  const defaultCommerce = {
    provider: 'gumroad',
    product: {
      id: 'menopause-relief',
      url: 'https://gumroad.com/checkout?_gl=1*15j4sn4*_ga*MTYwNTg2ODE2OS4xNzU5NTI1MDEz*_ga_6LJN6D94N6*czE3NjEzMjAyNTUkbzE0JGcxJHQxNzYxMzIxOTE5JGo1MSRsMCRoMA..',
      price: 12.99,
      currency: 'USD'
    }
  };

  function getCommerce() {
    return (window.__COMMERCE && window.__COMMERCE.product)
      ? window.__COMMERCE
      : defaultCommerce;
  }

  function formatPrice(value, currency, format) {
    if (format === 'number') {
      return Number(value).toString();
    }

    const resolvedFormat = format === 'currency' ? 'currency-2' : format;
    const fraction = resolvedFormat === 'currency-0' ? 0 : 2;
    const numberFormat = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: fraction,
      maximumFractionDigits: fraction
    });

    return numberFormat.format(value);
  }

  function applyCommerce(config) {
    const product = config.product || defaultCommerce.product;
    const { price, currency, url, id, name } = product;

    document.querySelectorAll('[data-commerce-price]').forEach((el) => {
      const format = el.dataset.commerceFormat || 'currency-0';
      el.textContent = formatPrice(price, currency, format);
    });

    document.querySelectorAll('[data-commerce-price-decimal]').forEach((el) => {
      el.textContent = formatPrice(price, currency, 'currency-2');
    });

    document.querySelectorAll('[data-commerce-number]').forEach((el) => {
      el.textContent = Number(price).toString();
    });

    document.querySelectorAll('[data-commerce-url]').forEach((el) => {
      if (el.tagName === 'A' || 'href' in el) {
        el.setAttribute('href', url);
      }
    });

    document.querySelectorAll('[data-commerce-product-id]').forEach((el) => {
      el.setAttribute('data-gumroad-product-id', id);
    });

    document.querySelectorAll('[data-commerce-name]').forEach((el) => {
      if (name) {
        el.textContent = name;
      }
    });

    document.querySelectorAll('[data-commerce-json]').forEach((el) => {
      try {
        const parsed = JSON.parse(el.textContent.trim());
        if (parsed && parsed.offers) {
          parsed.offers.price = price;
          parsed.offers.priceCurrency = currency;
        }
        if (parsed && parsed.name && name) {
          parsed.name = name;
        }
        el.textContent = JSON.stringify(parsed, null, 2);
      } catch (error) {
        console.warn('Unable to update commerce JSON data', error);
      }
    });

    window.__COMMERCE = config;
  }

  window.getCommerceConfig = function () {
    return getCommerce();
  };

  window.addEventListener('commerce-ready', (event) => {
    applyCommerce(event.detail || getCommerce());
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyCommerce(getCommerce()));
  } else {
    applyCommerce(getCommerce());
  }
})();
