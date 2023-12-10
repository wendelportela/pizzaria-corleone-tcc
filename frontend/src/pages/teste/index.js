import React, { useState } from 'react';
import Modal from 'react-modal';
import './index.scss'

// Configurar o elemento raiz do modal
Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(''); // Para armazenar a forma de pagamento selecionada
  const [selectedDate, setSelectedDate] = useState(''); // Para armazenar a data selecionada

  // Função para abrir o modal
  function openModal() {
    setModalIsOpen(true);
  }

  // Função para fechar o modal
  function closeModal() {
    setModalIsOpen(false);
  }

  // Função para lidar com a submissão do formulário
  function handleFilterSubmit(event) {
    event.preventDefault();
    // Aqui você pode processar os filtros de pagamento e data
    console.log('Forma de pagamento selecionada:', selectedPayment);
    console.log('Data selecionada:', selectedDate);
    closeModal();
  }

  return (
    <div>
      <button onClick={openModal}>Abrir Pop-up de Filtros</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal de Filtros"
        className="custom-modal"
      >
        <h2>Filtros</h2>
        <form onSubmit={handleFilterSubmit}>
          {/* Forma de pagamento */}
          <label>
            Forma de Pagamento:
            <select onChange={(e) => setSelectedPayment(e.target.value)}>
              <option value="">Selecione...</option>
              <option value="pix">Pix</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao">Cartão de Crédito</option>
            </select>
          </label>

          {/* Data */}
          <label>
            Data:
            <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
          </label>
          <button type="submit">Aplicar Filtros</button>
        </form>
      </Modal>
    </div>
  );
}

export default App;




/*import React, { useState } from 'react';
import Modal from 'react-modal';

// Configurar o elemento raiz do modal
Modal.setAppElement('#root');

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(''); // Para armazenar a forma de pagamento selecionada
  const [selectedDate, setSelectedDate] = useState(''); // Para armazenar a data selecionada

  // Função para abrir o modal
  function openModal() {
    setModalIsOpen(true);
  }

  // Função para fechar o modal
  function closeModal() {
    setModalIsOpen(false);
  }

  // Função para lidar com a submissão do formulário
  function handleFilterSubmit(event) {
    event.preventDefault();
    // Aqui você pode processar os filtros de pagamento e data
    console.log('Forma de pagamento selecionada:', selectedPayment);
    console.log('Data selecionada:', selectedDate);
    closeModal();
  }

  return (
    <div>
      <button onClick={openModal}>Abrir Pop-up de Filtros</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal de Filtros"
        className="custom-modal"
      >
        <h2>Filtros</h2>
        <form onSubmit={handleFilterSubmit}>
          {/* Forma de pagamento }
          <label>
            Forma de Pagamento:
            <select onChange={(e) => setSelectedPayment(e.target.value)}>
              <option value="">Selecione...</option>
              <option value="pix">Pix</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao">Cartão de Crédito</option>
            </select>
          </label>

          {/* Data }
          <label>
            Data:
            <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
          </label>
          <button type="submit">Aplicar Filtros</button>
        </form>
      </Modal>
    </div>
  );
}

export default App;

*/
