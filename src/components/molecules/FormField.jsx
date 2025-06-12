import React from 'react';
import Label from '@/components/atoms/Label';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Textarea from '@/components/atoms/Textarea';
import ApperIcon from '@/components/ApperIcon';

const FormField = ({
    label,
    name,
    type = 'text', // 'text', 'email', 'tel', 'date', etc.
    value,
    onChange,
    placeholder,
    required = false,
    options, // For select type
    rows, // For textarea type
    iconName, // For adding an icon to the label
    ...props
}) => {
    const renderInput = () => {
        switch (type) {
            case 'select':
                return (
                    <Select
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </Select>
                );
            case 'textarea':
                return (
                    <Textarea
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        rows={rows}
                        required={required}
                        {...props}
                    />
                );
            default:
                return (
                    <Input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        required={required}
                        {...props}
                    />
                );
        }
    };

    return (
        <div>
            <Label htmlFor={name}>
                {iconName && <ApperIcon name={iconName} className="w-4 h-4 inline mr-1" />}
                {label} {required && '*'}
            </Label>
            {renderInput()}
        </div>
    );
};

export default FormField;