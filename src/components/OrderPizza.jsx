import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './OrderPizza.css';

const initialForm = {
    isim: '',
    boyut: '',
    kenar: '',
    malzemeler: [],
    özel: ''
};

const errorMessages = {
    isim: 'İsim en az 3 karakter olmalıdır',
    boyut: 'Pizza boyutu seçilmelidir',
    kenar: 'Lütfen bir hamur kalınlığı seçin',
    malzemeler: 'Malzemeler en az 4 ve en fazla 10 adet olmalıdır'
};

const malzemeListesi = [
    'Pepperoni', 'Domates', 'Biber', 'Sosis', 'Mısır',
    'Sucuk', 'Kanada Jambonu', 'Peynir', 'Ananas',
    'Tavuk Izgara', 'Jalepeno', 'Kabak', 'Soğan',
    'Sarımsak', 'Zeytin'
];

export default function OrderPizza() {
    const [form, setForm] = useState(initialForm);
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({
        isim: false,
        boyut: false,
        kenar: false,
        malzemeler: false
    });
    const [quantity, setQuantity] = useState(1);
    const history = useHistory();

    useEffect(() => {
        const formErrors = validateForm();
        setErrors(formErrors);
        setIsValid(Object.keys(formErrors).length === 0);
    }, [form]);

    const validateForm = () => {
        let errors = {};
        if (form.isim.length < 3) errors.isim = true;
        if (!form.boyut) errors.boyut = true;
        if (!form.kenar) errors.kenar = true;
        if (form.malzemeler.length < 4 || form.malzemeler.length > 10) errors.malzemeler = true;
        return errors;
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm(newForm => ({
            ...newForm,
            [name]: type === 'checkbox' ? checked : value,
            malzemeler: type === 'checkbox'
                ? checked
                    ? [...newForm.malzemeler, value]
                    : newForm.malzemeler.filter(item => item !== value)
                : newForm.malzemeler
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValid) return;

        axios.post('https://reqres.in/api/pizza', form)
            .then(response => {
                console.log('Sipariş Özeti:', response.data);
                history.push('/success');
            })
            .catch(error => {
                console.error('Sipariş gönderilemedi:', error);
                history.push('/error');
            });
    };


    const basePizzaPrice = 85.50;
    const malzemeFiyati = 5;

    const selectionsTotal = form.malzemeler.length * malzemeFiyati;
    const totalPrice = (basePizzaPrice + selectionsTotal) * quantity;


    return (
        <div className='pizzaSiparisi'>
            <div className="header">
                <h1>Teknolojik Yemekler</h1>
                <nav>
                    <div className='navDiv'>
                        <a href="/">Anasayfa</a> - <a href="/order" className="active">Sipariş Oluştur</a>
                    </div>
                </nav>
            </div>
            <div className="order-pizza">
                <h1>Position Absolute Acı Pizza</h1>
                <div className="price-rating">
                    <span className="price">85.50₺</span>
                    <span className="rating">4.9</span>
                    <span className="reviews">(200)</span>
                </div>
                <p className="description">
                    Front End Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='boyutlar'>
                    <div>
                        <label className='b1 required'>Boyut Seç</label>
                        <div className='a1'>
                            <label>
                                <input
                                    type="radio"
                                    name="boyut"
                                    value="Küçük"
                                    checked={form.boyut === 'Küçük'}
                                    onChange={handleChange}
                                />
                                Küçük
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="boyut"
                                    value="Orta"
                                    checked={form.boyut === 'Orta'}
                                    onChange={handleChange}
                                />
                                Orta
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="boyut"
                                    value="Büyük"
                                    checked={form.boyut === 'Büyük'}
                                    onChange={handleChange}
                                />
                                Büyük
                            </label>
                        </div>
                        {errors.boyut && <p className="error-message">{errorMessages.boyut}</p>}
                    </div>

                    <div className='a3'>
                        <label className='b2 required'>Hamur Seç</label>
                        <div className='a2'>
                            <select name="kenar" value={form.kenar} onChange={handleChange}>
                                <option value="">Hamur Kalınlığı</option>
                                <option value="İnce">İnce</option>
                                <option value="Kalın">Kalın</option>
                            </select>
                        </div>
                        {errors.kenar && <p className="error-message">{errorMessages.kenar}</p>}
                    </div>
                </div>

                <div>
                    <div className='a4'>
                        <label>Ek Malzemeler</label>
                        <p className='p1'>En fazla 10 malzeme seçebilirsiniz. 5₺</p>
                    </div>
                    <div className="checkbox-container">
                        {malzemeListesi.map((malzeme) => (
                            <label key={malzeme}>
                                <input
                                    type="checkbox"
                                    name="malzemeler"
                                    value={malzeme}
                                    checked={form.malzemeler.includes(malzeme)}
                                    onChange={handleChange}
                                />
                                {malzeme}
                            </label>
                        ))}
                    </div>
                    {errors.malzemeler && <p className="error-message">{errorMessages.malzemeler}</p>}
                </div>

                <div className='isiminput'>
                    <label>
                        İsim
                        <input
                            type="text"
                            name="isim"
                            value={form.isim}
                            onChange={handleChange}
                        />
                    </label>
                    {errors.isim && <p className="error-message">{errorMessages.isim}</p>}
                </div>

                <div className='a6'>
                    <label>
                        Sipariş Notu
                        <input
                            name="özel"
                            value={form.özel}
                            onChange={handleChange}
                            placeholder="Siparişine eklemek istediğin bir not var mı?"
                            className="fixed-input"
                            rows={1}
                        />
                    </label>
                </div>

                <div className="horizontal-line">
                    <hr />
                </div>

                <div className='a7'>
                    <div className="quantity-selector">
                        <button type="button" onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                        <span>{quantity}</span>
                        <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>
                    <div className='a8'>
                        <div className="order-summary">
                            <div className="summary-item">
                                <span className="summary-label1">Sipariş Toplamı</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label">Seçimler</span>
                                <span className="summary-value">{selectionsTotal.toFixed(2)}₺</span>
                            </div>
                            <div className="summary-item">
                                <span className="summary-label total">Toplam</span>
                                <span className="summary-value total">{totalPrice.toFixed(2)}₺</span>
                            </div>
                        </div>

                        <div>
                            <button type="submit" disabled={!isValid}>
                                Sipariş Ver
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}