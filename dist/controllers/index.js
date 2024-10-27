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
// Define a nested menu structure
const ussdMenu = {
    main: {
        message: 'Welcome to Mobile Money\nPlease select an option:',
        options: {
            '1': {
                label: 'Check Balance',
                nextMenu: {
                    message: 'Select account type:',
                    options: {
                        '1': {
                            label: 'Savings Account',
                            nextMenu: {
                                message: 'Select balance type:',
                                options: {
                                    '1': {
                                        label: 'Current Balance',
                                        action: 'balance',
                                        accountType: 'savings',
                                    },
                                    '2': {
                                        label: 'Available Balance',
                                        action: 'availableBalance',
                                        accountType: 'savings',
                                    },
                                    '3': {
                                        label: 'Mini Statement',
                                        action: 'miniStatement',
                                        accountType: 'savings',
                                    },
                                },
                            },
                        },
                        '2': {
                            label: 'Mobile Wallet',
                            nextMenu: {
                            /* Similar nested structure for Mobile Wallet */
                            },
                        },
                        '3': {
                            label: 'Credit Account',
                            nextMenu: {
                            /* Similar nested structure for Credit Account */
                            },
                        },
                        '4': {
                            label: 'Business Account',
                            nextMenu: {
                            /* Similar nested structure for Business Account */
                            },
                        },
                    },
                },
            },
            '2': {
                label: 'Send Money',
                nextMenu: {
                    message: 'Select recipient type:',
                    options: {
                        '1': {
                            label: 'Mobile Money',
                            action: 'sendMoney',
                            recipientType: 'mobile',
                        },
                        '2': {
                            label: 'Bank Account',
                            action: 'sendMoney',
                            recipientType: 'bank',
                        },
                        '3': {
                            label: 'Other Networks',
                            action: 'sendMoney',
                            recipientType: 'other',
                        },
                        '4': {
                            label: 'International Transfer',
                            action: 'sendMoney',
                            recipientType: 'international',
                        },
                    },
                },
            },
            // More main menu options can be added here...
        },
    },
};
// Utility function to generate menu based on options
const generateMenu = (menu, prefix = '') => {
    return Object.entries(menu.options)
        .map(([key, option]) => `${prefix}${key}. ${option.label}`)
        .join('\n');
};
// Function to navigate through the nested USSD menu
const handleUSSDInput = (text, menu = ussdMenu.main) => {
    const inputSteps = text.split('*'); // Split user input into steps
    let currentMenu = menu;
    let response = '';
    // Traverse through the input to reach the correct menu level
    for (const step of inputSteps) {
        if (currentMenu.options &&
            currentMenu.options[step]) {
            currentMenu =
                currentMenu.options[step].nextMenu ||
                    currentMenu.options[step];
        }
        else {
            // If the step does not exist in the current menu, return an error
            return `END Invalid input. Please try again.`;
        }
    }
    // If the menu has a message, show the options
    if (currentMenu.message) {
        response = `CON ${currentMenu.message}\n${generateMenu(currentMenu)}`;
    }
    else if (currentMenu.action) {
        // Handle specific actions like showing balances or completing actions
        switch (currentMenu.action) {
            case 'balance':
                response = `END Your current balance for ${currentMenu.accountType} is 500 USD`; // Placeholder balance
                break;
            case 'availableBalance':
                response = `END Your available balance for ${currentMenu.accountType} is 480 USD`; // Placeholder available balance
                break;
            case 'miniStatement':
                response = `END Mini statement for ${currentMenu.accountType}: Last 3 transactions\n1. -50 USD\n2. +200 USD\n3. -30 USD`;
                break;
            case 'sendMoney':
                response = `CON Enter recipient's phone number for ${currentMenu.recipientType} transfer:`;
                break;
            default:
                response = `END Invalid action.`;
        }
    }
    return response;
};
// Main handler for USSD requests
const useHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body; // Input text from user
        const response = handleUSSDInput(text); // Process the input through the reusable function
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
