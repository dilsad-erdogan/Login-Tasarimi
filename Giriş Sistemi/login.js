document.getElementById('tel').addEventListener('input', function (e) {
    var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});
document.getElementById('formFile').addEventListener('change', function (e) {
    var check = checkFile();
    if (check.isOk) {
        var fileReader = new FileReader();
        fileReader.onload = function () {
            document.getElementById('picture').src = fileReader.result;
        }
        fileReader.readAsDataURL(e.target.files[0]);
    }
});
function checkFile() {
    var msg = { isOk: false, errMsg: "" };
    const file = document.getElementById('formFile').files[0];
    if (file === undefined) {
        msg.errMsg = 'Lütfen resim seçiniz.';
        msg.isOk = false;
        return msg;
    }
    const extension = file.name.split('.').pop().toLowerCase();
    if (extension != 'jpg' && extension != 'png' && extension != 'jpeg') {
        msg.errMsg = 'Lütfen (.jpg, .png, .jpeg) formatında bir resim seçiniz.';
        msg.isOk = false;
        return msg;
    }
    if (file.size > 2097152) {
        msg.errMsg = 'Lütfen 2MB\'dan küçük bir resim seçiniz.';
        msg.isOk = false;
        return msg;
    }
    msg.isOk = true;
    return msg;
}
function validate() {
    var isValid = true;
    if (document.getElementById('hdn_action').value == 'kayit') {
        if (document.getElementById('name').value.replace(/ /g, '') === '') {
            document.getElementById('name').classList.add('is-invalid');
            isValid = false;
        } else {
            isValid = true;
            document.getElementById('name').classList.add('is-valid');
            if (document.getElementById('name').classList.contains('is-invalid')) {
                document.getElementById('name').classList.remove('is-invalid');
            }
        }
        if (document.getElementById('password').value.replace(/ /g, '') === '') {
            document.getElementById('password').classList.add('is-invalid');
            isValid = false;
        } else {
            isValid = true;
            document.getElementById('password').classList.add('is-valid');
            if (document.getElementById('password').classList.contains('is-invalid')) {
                document.getElementById('password').classList.remove('is-invalid');
            }
        }
        if (document.getElementById('education').value.replace(/ /g, '') === '') {
            document.getElementById('education').classList.add('is-invalid');
            isValid = false;
        } else {
            isValid = true;
            document.getElementById('education').classList.add('is-valid');
            if (document.getElementById('education').classList.contains('is-invalid')) {
                document.getElementById('education').classList.remove('is-invalid');
            }
        }
        if (document.getElementById('email').value.replace(/ /g, '') === '') {
            document.getElementById('email').classList.add('is-invalid');
            isValid = false;
        } else {
            isValid = true;
            document.getElementById('email').classList.add('is-valid');
            if (document.getElementById('email').classList.contains('is-invalid')) {
                document.getElementById('email').classList.remove('is-invalid');
            }
        }
        if (document.getElementById('tel').value.replace(/ /g, '') === '') {
            document.getElementById('tel').classList.add('is-invalid');
            isValid = false;
        } else {
            isValid = true;
            document.getElementById('tel').classList.add('is-valid');
            if (document.getElementById('tel').classList.contains('is-invalid')) {
                document.getElementById('tel').classList.remove('is-invalid');
            }
        }
        if (document.getElementById('city').value.replace(/ /g, '') === '') {
            document.getElementById('city').classList.add('is-invalid');
            isValid = false;
        } else {
            isValid = true;
            document.getElementById('city').classList.add('is-valid');
            if (document.getElementById('city').classList.contains('is-invalid')) {
                document.getElementById('city').classList.remove('is-invalid');
            }
        }
        if (document.getElementById('formFile').value.replace(/ /g, '') === '') {
            document.getElementById('formFile').classList.add('is-invalid');
            isValid = false;
        } else {
            var chekFileReturn = checkFile();
            if (chekFileReturn.isOk) {
                isValid = true;
                document.getElementById('formFile').classList.add('is-valid');
                if (document.getElementById('formFile').classList.contains('is-invalid')) {
                    document.getElementById('formFile').classList.remove('is-invalid');
                }
            } else {
                isValid = false;
                alert(chekFileReturn.msg);
                document.getElementById('formFile').classList.add('is-invalid');
            }
        }
        return isValid;
    } else {
        return true;
    }
}
function saveValues() {
    document.getElementById('hdn_action').value = 'kayit';
    if (validate()) {
        showModal('question', 'Giriş bilgilerini onaylıyor musunuz?', 'Onay', () => {
            var request = $.ajax({
                url: "/Project_ogrenci.asmx/Kaydet",
                type: "POST",
                data: {
                    usr: '80yxxWyJLE', pwd: 'zoi3jThYBr',
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    education: document.getElementById('education').value,
                    tel: document.getElementById('tel').value,
                    password: document.getElementById('password').value,
                    picture: document.getElementById('picture').src,
                    city: document.getElementById('city').value
                },
            });
            request.done(function (xmlDoc) {
                var msg = "";
                var msgErr = "";
                if (xmlDoc != '' && xmlDoc != null) {
                    if (xmlDoc.getElementsByTagName('RC')[0].firstChild.nodeValue == 1) timeOut();
                    if (xmlDoc.getElementsByTagName('RC')[0].firstChild.nodeValue == 0) {
                        if (xmlDoc.getElementsByTagName("RESULT")[0].childNodes[0]) {
                            if (xmlDoc.getElementsByTagName('msg')[0].firstChild) {
                                if (xmlDoc.getElementsByTagName('msg')[0].firstChild.nodeValue == 'OK') {
                                    sorgula();
                                    msg = '<strong>Başvurunuz başarıyla oluşturulmuştur.</strong><br><small>Sayfayı terk edebilirsiniz.</small>';
                                } else
                                    msgErr = '<strong>Kayıt esnasında hata ile karşılaşıldı.</strong><br><small>Sayfayı yeniledikten sonra tekrar deneyiniz...</small>';
                            } else
                                msgErr = '<strong>Kayıt esnasında hata ile karşılaşıldı.</strong><br><small>Sayfayı yeniledikten sonra tekrar deneyiniz...</small>';
                        } else
                            msgErr = '<strong>Kayıt esnasında hata ile karşılaşıldı.</strong><br><small>Sayfayı yeniledikten sonra tekrar deneyiniz...</small>';
                    } else {
                        if (xmlDoc.getElementsByTagName("ERROR")[0].firstChild)
                            msgErr = '<strong>Kayıt esnasında hata ile karşılaşıldı.</strong><br><small>' + xmlDoc.getElementsByTagName("ERROR")[0].firstChild.nodeValue + '</small>';
                        else
                            msgErr = '<strong>Kayıt esnasında hata ile karşılaşıldı.</strong><br><small>Sayfayı yeniledikten sonra tekrar deneyiniz...</small>';
                    }
                } else {
                    msgErr = '<strong>Kayıt esnasında hata ile karşılaşıldı.</strong><br><small>Sayfayı yeniledikten sonra tekrar deneyiniz...</small>';
                }
                if (msg) {
                    showModal('success', msg, 'Onaylandı');
                } else if (msgErr) {
                    showModal('error', msgErr, 'Hata!');
                }
            });
            request.fail(function (jqXHR, textStatus) {
                showModal('error', textStatus, 'Hata Oluştu!');
            });
        });
    } else {
        showModal('error', 'Giriş bilgileri eksik, lütfen geri dönüp tamamlayın.', 'Eksik Bilgi');
    }
}
function showModal(type, message, title, onclick) {
    $('#staticBackdropOption').hide();
    document.getElementById('staticBackdropHeader').classList = null;
    document.getElementById('staticBackdropHeader').classList.add('modal-header');
    switch (type) {
        case 'question': {
            document.getElementById('staticBackdropHeader').classList.add('bg-primary');
            document.getElementById('staticBackdropOption').onclick = onclick;
            document.getElementById('staticBackdropOption').innerText = 'Kaydet';
            document.getElementById('staticBackdropClose').innerText = 'Vazgeç';
            $('#staticBackdropHeaderLogo').attr('src', 'question.png');
            $('#staticBackdropOption').show();
        } break;
        case 'success': {
            document.getElementById('staticBackdropHeader').classList.add('bg-success');
            document.getElementById('staticBackdropClose').innerText = 'Kapat';
            $('#staticBackdropHeaderLogo').attr('src', 'ok.gif');
            $('#staticBackdropClose').show();
        } break;
        case 'error': {
            document.getElementById('staticBackdropHeader').classList.add('bg-danger');
            document.getElementById('staticBackdropClose').innerText = 'Geri Dön';
            $('#staticBackdropHeaderLogo').attr('src', 'denied.gif');
            $('#staticBackdropClose').show();
        } break;
    }
    document.getElementById('staticBackdropHeader').classList.add('text-white');
    document.getElementById('staticBackdropLabel').innerText = title;
    document.getElementById('staticBackdropBody').innerHTML = message;
    $('#staticBackdrop').modal('show');
}
function removeWhitespace(xml) {
    var loopIndex;
    for (loopIndex = 0; loopIndex < xml.childNodes.length; loopIndex++) {
        var currentNode = xml.childNodes[loopIndex];
        if (currentNode.nodeType == 1) {
            removeWhitespace(currentNode);
        }
        if (((/^\s+$/.test(currentNode.nodeValue))) && (currentNode.nodeType == 3)) {
            xml.removeChild(xml.childNodes[loopIndex--]);
        }
    }
}