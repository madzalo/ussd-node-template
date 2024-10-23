import { Request, Response } from 'express';

export const useHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      sessionId,
      serviceCode,
      phoneNumber,
      text,
    } = req.body;
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
  } catch (error: any) {
    console.error(
      'Error processing USSD request:',
      error.message
    );
    res.status(500).json({
      message:
        'An internal server error occurred. Please try again later.',
    });
  }
};
