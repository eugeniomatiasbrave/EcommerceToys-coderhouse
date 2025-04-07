
const form = document.getElementById('formProduct');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/api/users/profile', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Perfil actualizado con éxito');
            console.log(result);
        } else {
            console.error('Error al actualizar el perfil:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});