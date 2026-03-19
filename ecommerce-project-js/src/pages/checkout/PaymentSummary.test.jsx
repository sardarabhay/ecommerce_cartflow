import { it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PaymentSummary } from "./PaymentSummary";
import axios from "axios";
import { MemoryRouter } from 'react-router';
import { userEvent } from '@testing-library/user-event';
import { useLocation } from 'react-router';
vi.mock('axios');



describe("PaymentSummary Component", () => {
    let paymentSummary;
    let loadCart;

    beforeEach(() => {
        paymentSummary = {
            "totalItems": 11,
            "productCostCents": 10667,
            "shippingCostCents": 0,
            "totalCostBeforeTaxCents": 10667,
            "taxCents": 1067,
            "totalCostCents": 11734
        };
        loadCart = vi.fn();

    });
    it("should display payment summary correctly", () => {

        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
            </MemoryRouter>
        );
        const paymentSummaryItems = screen.getByTestId('payment-summary-items');

        expect(paymentSummaryItems).toHaveTextContent('Items (11):');
        expect(paymentSummaryItems).toHaveTextContent('$106.67');

        const paymentSummaryShipping = screen.getByTestId('payment-summary-shipping');
        expect(paymentSummaryShipping).toHaveTextContent('Shipping & handling:');
        expect(paymentSummaryShipping).toHaveTextContent('$0.00');

        const paymentSummarySubtotal = screen.getByTestId('payment-summary-subtotal');
        expect(paymentSummarySubtotal).toHaveTextContent('Total before tax:');
        expect(paymentSummarySubtotal).toHaveTextContent('$106.67');

        const paymentSummaryTax = screen.getByTestId('payment-summary-tax');
        expect(paymentSummaryTax).toHaveTextContent('Estimated tax (10%):');
        expect(paymentSummaryTax).toHaveTextContent('$10.67');

        const paymentSummaryTotal = screen.getByTestId('payment-summary-total');
        expect(paymentSummaryTotal).toHaveTextContent('Order total:');
        expect(paymentSummaryTotal).toHaveTextContent('$117.34');

    });

    it("should handle create order", async () => {
        function Location(){
            const location = useLocation();
            return(
                <div data-testid="url-path">{location.pathname}</div>
            )
        }

        render(
            <MemoryRouter>
                <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
                <Location />
            </MemoryRouter>
        );
        
        const user = userEvent.setup();
        const placeOrderButton = screen.getByTestId('place-order-button');
        await user.click(placeOrderButton);
        expect(axios.post).toHaveBeenCalledWith('/api/orders');
        expect(loadCart).toHaveBeenCalled();
        const urlPath=screen.getByTestId('url-path');
        expect(urlPath).toHaveTextContent('/orders');


    });
});