$("#petrolprice").on('input keyup', update_discount_calcs);
$("#discount").on('input keyup', update_discount_calcs);
$("#cash").on('input keyup', update_discount_calcs);

function update_discount_calcs() {
    price = parseInt($("#petrolprice").val());
    discount = parseInt($("#discount").val());
    cash = parseInt($("#cash").val());

    litres = calc_litres(price, discount, cash);
    spend = calc_spend(price, litres);

    if (isFinite(litres) && isFinite(spend)) {
        $(".result_litres").html(litres.toFixed(2));
        $(".result_spend").html(spend.toFixed(2));

        without_discount = calc_litres(price, 0, cash);
        petrol_gained = litres - without_discount;
        $(".petrol_gained").html(petrol_gained.toFixed(2));
    } else {
        $(".result_litres").html("?");
        $(".result_spend").html("?");
        $(".petrol_gained").html("?");
    }
}

function calc_litres(price, discount, cash) {
    return (cash * 100) / (price - discount);
}

function calc_spend(price, litres) {
    return (price * litres) / 100;
}