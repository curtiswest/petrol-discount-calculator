$("#petrolprice").on('input keyup', update_discount_calcs);
$("#discount").on('input keyup', update_discount_calcs);
$("#cash").on('input keyup', update_discount_calcs);

function update_discount_calcs() {
    price = $("#petrolprice").val();
    discount = $("#discount").val();
    cash = $("#cash").val();

    litres = calc_litres(price, discount, cash);
    spend = calc_spend(price, litres);

    if (isFinite(litres)) {
        $(".result_litres").html(litres.toFixed(2));

        without_discount = calc_litres(price, 0, cash);
        petrol_gained = litres - without_discount;
        if (isFinite(petrol_gained)) {
            $(".petrol_gained").html(petrol_gained.toFixed(2));
        }
    }
    if (isFinite(spend)) {
        $(".result_spend").html(spend.toFixed(2));
    }
}

function calc_litres(price, discount, cash) {
    if (isNaN(price) || isNaN(discount) || isNaN(cash)) {
        return 0
    } else {
        return (cash * 100) / (price - discount);
    }
}

function calc_spend(price, litres) {
    if (isNaN(price) || isNaN(litres)) {
        return 0
    } else {
        return (price * litres) / 100;
    }
}