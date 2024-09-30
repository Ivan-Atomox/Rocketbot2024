"""conf file."""

import pytest

def pytest_configure():
    """Configure pytest."""
    pytest.variables = []
    pytest.commands = []
    pytest.running_command = {}
