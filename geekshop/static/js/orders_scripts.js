window.onload = function () {
    var _quantity, _price, orderitem_num, delta_quantity, orderitem_quantity, delta_cost;
    var quantity_arr = [];
    var price_arr = [];

    var currency = $('input[name="currency"]').val();

    var TOTAL_FORMS = parseInt($('input[name="orderitems-TOTAL_FORMS"]').val());

    var order_total_quantity = parseInt($('.order_total_quantity').text()) || 0;

    var order_total_cost = parseFloat(getPriceNumber($('.order_total_cost').text().trim()).replace(',', '.')) || 0;

    for (var i = 0; i < TOTAL_FORMS; i++) {
        _quantity = parseInt($('input[name="orderitems-' + i + '-quantity"]').val());

        _price = parseFloat(getPriceNumber($('.orderitems-' + i + '-price').text().trim()).replace(',', '.'));

        quantity_arr[i] = _quantity;
        if (_price) {
            price_arr[i] = _price;
        } else {
            price_arr[i] = 0;
        }
    }

    if (!order_total_quantity) {
        for (var i = 0; i < TOTAL_FORMS; i++) {
            order_total_quantity += quantity_arr[i];
            order_total_cost += quantity_arr[i] * price_arr[i];
        }
        $('.order_total_quantity').html(order_total_quantity.toString());
        $('.order_total_cost').html(setPriceStr(Number(order_total_cost.toFixed(2)), currency));
    }

    $('.order_form').on('click', 'input[type="number"]', function () {
        var target = event.target;
        orderitem_num = parseInt(target.name.replace('orderitems-', '').replace('-quantity', ''));
        if (price_arr[orderitem_num]) {
            orderitem_quantity = parseInt(target.value);
            delta_quantity = orderitem_quantity - quantity_arr[orderitem_num];
            quantity_arr[orderitem_num] = orderitem_quantity;
            orderSummaryUpdate(price_arr[orderitem_num], delta_quantity);
        }
    });


    $('.order_form select').change(function () {
        var target = event.target;
        orderitem_num = parseInt(target.name.replace('orderitems-', '').replace('-price', ''));

        $.ajax({
            url: "/order/forming/addproduct/" + target.value + "/ajax/",
            success: function (data) {
                price_arr[orderitem_num] = getPriceNumber(data.result);
                $(`tr:eq(${orderitem_num + 1}) .td3`).html(data.result);
            },
        });

        event.preventDefault();
    });

    function orderSummaryUpdate(orderitem_price, delta_quantity) {
        delta_cost = orderitem_price * delta_quantity;

        order_total_cost = Number((order_total_cost + delta_cost).toFixed(2));
        order_total_quantity = order_total_quantity + delta_quantity;

        $('.order_total_cost').html(setPriceStr(Number(order_total_cost.toFixed(2)), currency));
        $('.order_total_quantity').html(order_total_quantity.toString());
    }

    function getPriceNumber(price_str) {
        var new_price_str = '';
        if (price_str.length > 0) {
            if (price_str.charAt(0) === '$') {
                new_price_str = price_str.substring(1);
            } else if (price_str.charAt(price_str.length - 1) === '₽') {
                new_price_str = price_str.substring(0, price_str.length - 1);
            }
        }
        return new_price_str
    }

    function setPriceStr(price_number, currency) {
        var price_str = '';
        switch (currency) {
            case '$':
                price_str = `${currency}${price_number}`;
                break;
            case '₽':
                price_str = `${price_number}${currency}`;
                break;
            default:
                price_str = `${price_number}`;
        }
        return price_str;
    }

    function deleteOrderItem(row) {
        var target_name = row[0].querySelector('input[type="number"]').name;
        orderitem_num = parseInt(target_name.replace('orderitems-', '').replace('-quantity', ''));
        delta_quantity = -quantity_arr[orderitem_num];
        orderSummaryUpdate(price_arr[orderitem_num], delta_quantity);
    }

    $('.formset_row').formset({
        addText: 'add product',
        deleteText: 'remove',
        prefix: 'orderitems',
        removed: deleteOrderItem
    });
}