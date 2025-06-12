import React from 'react';

const ReservationProgress = ({ step }) => {
    return (
        <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between">
                {[1, 2, 3].map((stepNumber) => (
                    <div key={stepNumber} className="flex items-center">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                                step >= stepNumber
                                    ? 'bg-primary text-white'
                                    : 'bg-surface-200 text-surface-500'
                            }`}
                        >
                            {stepNumber}
                        </div>
                        {stepNumber < 3 && (
                            <div
                                className={`h-1 w-20 md:w-32 mx-2 transition-colors ${
                                    step > stepNumber ? 'bg-primary' : 'bg-surface-200'
                                }`}
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-surface-600">
                <span>Date & Time</span>
                <span>Contact Info</span>
                <span>Confirmation</span>
            </div>
        </div>
    );
};

export default ReservationProgress;