import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const Otoday = dayjs().format('MMMM D');

const delivery= {
  getdeliveryPrice: function(deliveryOptionId) {
  const deliveryOption = this.deliveryOptions.find(option => option.id === deliveryOptionId);
  return deliveryOption ? deliveryOption.priceCents : 0;
  },

  getDeliveryDate: function(deliveryOptionId) {
  const today = dayjs();
  const deliveryDate = today.add(deliveryOptionId, 'day');
  const formattedDate = deliveryDate.format('dddd, MMMM D');
  return formattedDate;
  },

  getDeliveryDateorder: function(deliveryOptionId) {
  const today = dayjs();
  const deliveryDate = today.add(deliveryOptionId, 'day');
  const formattedDate = deliveryDate.format('MMMM D');
  return formattedDate;
  },

  deliveryOptions : [
  {
    id: 1,
    deliveryDays: 7,
    priceCents: 0,
  }, 
  {
    id: 2,
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: 3,
    deliveryDays: 1,
    priceCents: 999,
  }],
};

export { delivery };