using BE_V2.DataDB;
using FluentValidation;
using System;

    public class ProductValidator : AbstractValidator<Product>
    {
     public ProductValidator() 
    {
        RuleFor(product => product.ProductName)
            .NotEmpty().WithErrorCode("Product name must not be blank")
            .Must(productname => !productname.StartsWith(" ")).WithErrorCode("Product first character cannot have space")
            .Must(productname => !productname.Any(chr => !char.IsLetterOrDigit(chr))).WithErrorCode("Product name special characters are not allowed");
       
        RuleFor(product => product.ProductId)
            .NotEmpty().WithErrorCode("Product ID must not be blank")
            .Must(productid => !productid.ToString().StartsWith(" ")).WithErrorCode("Product ID first character cannot have space");
        
        RuleFor(product => product.ProductType)
            .NotEmpty().WithErrorCode("Product type must not be blank");
        
        RuleFor(product => product.Size)
            .NotEmpty().WithErrorCode("Size must not be blank")
            .Must(size => !size.StartsWith(" ")).WithErrorCode("Size first character cannot have space")
            .Matches(@"^[0-9]*$").WithMessage("Size must contain only numbers");

        RuleFor(product => product.Image1)
            .NotEmpty().WithMessage("Image1 must not be blank")
            .Must(url => Uri.IsWellFormedUriString(url, UriKind.Absolute)).WithMessage("Image1 must be a valid URL");

        RuleFor(product => product.Image2)
            .NotEmpty().WithMessage("Image2 must not be blank")
            .Must(url => Uri.IsWellFormedUriString(url, UriKind.Absolute)).WithMessage("Image2 must be a valid URL");

        RuleFor(product => product.Image3)
            .NotEmpty().WithMessage("Image3 must not be blank")
            .Must(url => Uri.IsWellFormedUriString(url, UriKind.Absolute)).WithMessage("Image3 must be a valid URL");
    }
    }

