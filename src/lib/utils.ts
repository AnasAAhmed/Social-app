
export enum ResultCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidSubmission = 'INVALID_SUBMISSION',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UnknownError = 'UNKNOWN_ERROR',
  UserCreated = 'USER_CREATED',
  UserLoggedIn = 'USER_LOGGED_IN'
}

export function extractNameFromEmail(email: string): string {
  const [localPart] = email.split('@');
  const name = localPart
    .replace(/[\._-]/g, '')  // Remove ".", "_", and "-"
    .replace(/\d+/g, '')     // Remove numbers
    .replace(/\s+/g, '')    // Remove any remaining spaces (precautionary)
    .toLowerCase();
  return name;
}

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Password Reset</h1>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <p>Hello,</p>
      <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
      <p>To reset your password, click the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
      </div>
      <p>This link will expire in 1 hour for security reasons.</p>
      <p>Best regards,<br>Your App Team</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </body>
  </html>
  `;
export const calculateTimeDifference = (date: number | Date) => {
  const currentDate = new Date().getTime();
  const dateTime = new Date(date).getTime();
  const difference = currentDate - dateTime;

  // Calculate time difference in minutes
  const minutesDifference = Math.floor(difference / (1000 * 60));
  // If difference is less than 0 minutes, show in minutes
  if (minutesDifference === 0) {
    return `just now`;
  }
  // If difference is less than 60 minutes, show in minutes
  if (minutesDifference < 60) {
    return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
  }

  // If difference is less than 24 hours, show in hours
  const hoursDifference = Math.floor(minutesDifference / 60);
  if (hoursDifference < 24) {
    return `${hoursDifference} hr ago`;
  }

  // Otherwise, show in days
  const daysDifference = Math.floor(hoursDifference / 24);
  if (daysDifference < 7) {
    return `${daysDifference}d ago`;
  }
  // Otherwise, show in weeks

  const weekDifference = Math.floor(daysDifference / 7);
  if (weekDifference < 4) {
    return `${weekDifference}w ago`;
  }

  const monthDifference = Math.floor(weekDifference / 4);
  return `${monthDifference} month${monthDifference > 1 ? 's' : ''} ago`;
}


export const extractUrl = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/;
  const match = text.match(urlRegex);
  return match ? match[0] : null;
};
