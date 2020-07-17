
$(document).ready(function () {
    $('#CPF').mask('000.000.000-00');
    $('#CEP').mask('00000-000');
    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        if (!validarCPF($(this).find("#CPF").val())) {
            ModalDialog("Alerta", "Insira um CPF válido!");
            return false;
        }
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": $(this).find("#CPF").val(),
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();
            }
        });
    })
    
})



function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    cpfCalcalculo = cpf.slice(0,9);
    valido = true;

    if (cpf == "" || cpf.length != 11)
        valido = false;

    //entra no for e enquanto o numero for igual ao primeiro digito ele continua e so sai se houver numeros diferentes
    for (i = 0; i < cpf.length; i++) {
        if (cpf.charAt(0) !== cpf.charAt(i)) {
            valido = true;
            i = cpf.length;
        } else {
            valido = false;
        }
    }
    if (!valido)
        return valido = false;

    for (a = 0; a < 2; a++) {
        multiplicador = cpfCalcalculo.length + 1;

        somaTotal = 0
        for (i = 0; i < cpfCalcalculo.length; i++) {
            somaTotal += parseInt(cpfCalcalculo.charAt(i)) * (multiplicador - i);
        }

        digito = somaTotal % 11;
        if (digito < 2)
            digito = 0;
        else
            digito = 11 - digito;

        cpfCalcalculo += digito;
    }
    if (cpfCalcalculo == cpf)
        valido = true;
    else
        valido = false;
    return valido;
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
