const formatDate = (dateString) => {
    if (!dateString) return "";
    // Divide a string "2023-10-25T..." para pegar apenas "2023-10-25"
    const datePart = dateString.split('T')[0];
    const [year, month, day] = datePart.split('-');
    
    // Retorna apenas dia e mês
    return `${day}/${month}`;
};

export default formatDate;