"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHandler = void 0;
const useHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId, serviceCode, phoneNumber, text, } = req.body;
        let response = '';
        // Handle USSD logic based on user input
        switch (text) {
            case '':
                response = `CON What would you like to check
1. My account
2. My phone number`;
                break;
            case '1':
                response = `CON Choose account information you want to view
1. Account number`;
                break;
            case '2':
                response = `END Your phone number is ${phoneNumber}`;
                break;
            case '1*1':
                const accountNumber = 'ACC100101'; // Placeholder account number
                response = `END Your account number is ${accountNumber}`;
                break;
            default:
                response = `END Invalid input. Please try again.`;
                break;
        }
        res.set('Content-Type', 'text/plain');
        res.send(response);
    }
    catch (error) {
        console.error('Error processing USSD request:', error.message);
        res.status(500).json({
            message: 'An internal server error occurred. Please try again later.',
        });
    }
});
exports.useHandler = useHandler;
