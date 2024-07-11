export const formatDateTime = (dateTimeString) => {
    // Split the input string into date and time parts
    const [datePart, timePart] = dateTimeString.split('T');

    const [year, month, day] = datePart.split('-');
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedDate = `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;

    // Parse the time part
    const [hours, minutes] = timePart.split(':');
    const hour = parseInt(hours, 10) > 12 ? parseInt(hours, 10) - 12 : parseInt(hours, 10);
    const ampm = parseInt(hours, 10) >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hour}:${minutes} ${ampm}`;

    return { date: formattedDate, time: formattedTime };
};

export const calculateTimeLeft = (targetDateTime) => {
    // Parse the target date and time
    const [dateString, timeString] = targetDateTime.split('T');
    const [year, month, day] = dateString.split('-').map(Number);
    const [hour, minute] = timeString.split(':').map(Number);

    // Create a new Date object using the extracted components
    const targetDate = new Date(year, month - 1, day, hour, minute);

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = targetDate - currentDate;

    // Calculate days and hours left
    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return { daysLeft, hoursLeft };
};