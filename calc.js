$("#petrolprice").on('input keyup', update_discount_calcs);
$("#discount").on('input keyup', update_discount_calcs);
$("#cash").on('input keyup', update_discount_calcs);

function update_discount_calcs() {
    var price = $("#petrolprice").val();
    var discount = $("#discount").val();
    var cash = $("#cash").val();

    var litres = calc_litres(price, discount, cash);
    var spend = calc_spend(price, litres);

    if (isFinite(price)) {
        $(".e10_price").html(calc_e10_breakpoint(price).toFixed(1));
    }

    if (isFinite(litres)) {
        $(".result_litres").html(litres.toFixed(2));

        var without_discount = calc_litres(price, 0, cash);
        var petrol_gained = litres - without_discount;
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

function calc_e10_breakpoint(price) {
    var petrol_kcal_litre = 7594.0;
    var ethanol_kcal_litre = 5062.7;

    var ratio = 0.10;
    var e10_kcal_litre = petrol_kcal_litre * (1-ratio) + ethanol_kcal_litre * ratio;

    return price * (e10_kcal_litre / petrol_kcal_litre);
}