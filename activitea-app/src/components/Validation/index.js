
const emailValidation = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
    if (emailRegex.test(email)) {
        return true
    } else {
        return false
    }
}

const phoneValidation = (phone) => {
    const frenchPhoneRegex = /^(0[1-7])\d{8}$/;
    if (frenchPhoneRegex.test(phone)) {
        return true
    } else {
        return false
    }
}
const dateValidation = (date) => {
    const dateRegex = /^(?:19|20)\d\d-(?:0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/;
    if (dateRegex.test(date)) {
        return true
    } else {
        return false
    }
}

const passwordValidation = (password) => {
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/;
    const numberRegex = /.*[0-9].*/;
    const capitalLetterRegex = /.*[A-Z].*/;
    const letterRegex = /.*[a-z].*/;
    const specialCharacterRegex = /.*[#?!@$%^&*-].*/;

    if (!passwordRegex.test(password)) {
        let message = "Au moins";
        if (password.length < 8) {
            message += " 8 charactères,";
        }
        if (!capitalLetterRegex.test(password)) {
            message += " une majuscule,";
        }
        if (!letterRegex.test(password)) {
            message += " une minuscule,";
        }
        if (!numberRegex.test(password)) {
            message += " un chiffre,";
        }
        if (!specialCharacterRegex.test(password)) {
            message += " un caractère spéciale.";
        }
        return { status: false, message };
    }

    return { status: true };
}

export {emailValidation,passwordValidation,phoneValidation,dateValidation}