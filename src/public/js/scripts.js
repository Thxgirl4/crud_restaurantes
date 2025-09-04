const API_URL = 'http://localhost:3000/';

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('restaurants-table')) {
        loadRestaurants();
    }

    if (document.getElementById('restaurant-form')) {
        const urlParams = new URLSearchParams(window.location.search);
        const restaurantId = urlParams.get('id');
        if (restaurantId) {
            loadRestaurantForEdit(restaurantId);
        }
        
        document.getElementById('restaurant-form').addEventListener('submit', handleFormSubmit);
    }
});

async function loadRestaurants() {
    try {
        const response = await fetch(`${API_URL}/restaurantes`);
        if (!response.ok) {
            throw new Error('Erro ao carregar restaurantes.');
        }
        const restaurants = await response.json();
        const tableBody = document.getElementById('restaurants-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ''; 
        restaurants.forEach(restaurant => {
            let row = tableBody.insertRow();
            row.innerHTML = `
                <td>${restaurant.nome}</td>
                <td>${restaurant.endereco}</td>
                <td>${restaurant.telefone || ''}</td>
                <td>${restaurant.email || ''}</td>
                <td>
                    <a href="restaurante.html?id=${restaurant.id}" class="btn btn-edit">Editar</a>
                    <button onclick="deleteRestaurant(${restaurant.id})" class="btn btn-delete">Excluir</button>
                </td>
            `;
        });
    } catch (error) {
        console.error('Erro:', error);
        alert(error.message);
    }
}

async function loadRestaurantForEdit(id) {
    document.getElementById('form-title').innerText = 'Editar Restaurante';
    try {
        const response = await fetch(`${API_URL}/restaurantes/${id}`);
        if (!response.ok) {
            throw new Error('Restaurante não encontrado.');
        }
        const restaurant = await response.json();
        document.getElementById('restaurant-id').value = restaurant.id;
        document.getElementById('nome').value = restaurant.nome;
        document.getElementById('endereco').value = restaurant.endereco;
        document.getElementById('telefone').value = restaurant.telefone || '';
        document.getElementById('email').value = restaurant.email || '';
        document.getElementById('site').value = restaurant.site || '';
        document.getElementById('descricao').value = restaurant.descricao || '';
    } catch (error) {
        console.error('Erro:', error);
        alert(error.message);
        window.location.href = 'index.html';
    }
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const id = document.getElementById('restaurant-id').value;
    const restaurantData = {
        nome: document.getElementById('nome').value,
        endereco: document.getElementById('endereco').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        site: document.getElementById('site').value,
        descricao: document.getElementById('descricao').value,
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/restaurantes/${id}` : `${API_URL}/restaurantes`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(restaurantData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao salvar restaurante.');
        }

        const result = await response.json();
        alert(result.message);
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Erro:', error);
        alert(error.message);
    }
}

async function deleteRestaurant(id) {
    if (!confirm('Tem certeza que deseja excluir este restaurante?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/restaurantes/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao excluir restaurante.');
        }

        const result = await response.json();
        alert(result.message);
        loadRestaurants(); 
    } catch (error) {
        console.error('Erro:', error);
        alert(error.message);
    }
}

