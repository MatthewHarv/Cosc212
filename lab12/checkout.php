<!DOCTYPE html>
<?php
$scriptList = array(
    'jquery-3.2.1.min.js',
    'cookies.js',
    'checkout.js',
    'showHide.js',
    'checkoutValidation.js'
);
include('protect/header.php'); ?>


        <div id="main">
            <!-- Content is JavaScript driven -->
            <h3>Shopping Cart Contents</h3>
            <div id="cart"></div>
            <div id="errors"></div>
        <form id="checkoutForm" novalidate action="validateCheckout.php" method="post">
                <fieldset>
                    <legend>Delivery Details:</legend>
                    <p>
                        <label for="deliveryName">Deliver to:</label>
                        <input type="text" name="deliveryName" id="deliveryName">
                    </p>
                    <p>
                        <label for="deliveryEmail">Email:</label>
                        <input type="email" name="deliveryEmail" id="deliveryEmail">
                    </p>
                    <p>
                        <label for="deliveryAddress1">Address:</label>
                        <input type="text" name="deliveryAddress1" id="deliveryAddress1">
                    </p>
                    <p>
                        <label for="deliveryAddress2"></label>
                        <input type="text" name="deliveryAddress2" id="deliveryAddress2">
                    </p>
                    <p>
                        <label for="deliveryCity">City:</label>
                        <input type="text" name="deliveryCity" id="deliveryCity"
                    </p>
                    <p>
                        <label for="deliveryPostcode">Postcode:</label>
                        <input type="text" name="deliveryPostcode" id="deliveryPostcode">
                    </p>
                </fieldset>
                
                <fieldset>
                    <legend>Payment Details:</legend>
                    <p>
                        <label for="cardType">Card type:</label>
                        <select name="cardType" id="cardType">
                            <option value="amex">American Express</option>
                            <option value="mcard">Master Card</option>
                            <option value="visa">Visa</option>
                        </select>
                    </p>
                    <p>
                        <label for="cardNumber">Card number:</label>
                        <input type="text" name="cardNumber" id="cardNumber">
                    </p>
                    <p>
                        <label for="cardMonth">Expiry date:</label>
                        <select name="cardMonth" id="cardMonth">
                            <option value="1">01</option>
                            <option value="2">02</option>
                            <option value="3">03</option>
                            <option value="4">04</option>
                            <option value="5">05</option>
                            <option value="6">06</option>
                            <option value="7">07</option>
                            <option value="8">08</option>
                            <option value="9">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <label for="cardYear" class="tight">/</label>
                        <select name="cardYear" id="cardYear">
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                        </select>
                    </p>
                    <p>
                        <label for="cardValidation">CVC:</label>
                        <input type="text" class="short" name="cardValidation" id="cardValidation">
                    </p>
                </fieldset>
                <input type="submit">
            </form>
        </div>

       <?php include ("protect/footer.php"); ?>

    </body>
</html>