# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'quilljs/rails/version'

Gem::Specification.new do |spec|
  spec.name          = "quilljs-rails"
  spec.version       = Quilljs::Rails::VERSION
  spec.authors       = ["Abhinav Mathur"]
  spec.email         = ["amathur5000@gmail.com"]

  spec.summary       = %q{This gem adds quill rich text editor to input fields}
  spec.description   = ''
  spec.homepage      = 'https://www.github.com/abhinavmathur/quilljs-rails'
  spec.license       = "MIT"
  spec.files         = `git ls-files`.split("\n")

  spec.executables   = []
  spec.require_paths = ['lib']
  spec.required_ruby_version = '>= 2.1.3'

  spec.add_development_dependency 'bundler', '~> 1.13'
  spec.add_development_dependency 'rake', '~> 10.0'
  spec.add_development_dependency 'jquery-rails', '~> 4.1'

end
