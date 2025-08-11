import pyautogui
import os
import time
import random
import string
import threading
from datetime import datetime, timedelta
import json
import sys

class AdvancedTypingSimulator:
    def __init__(self, parent_directory=None):
        """
        Initialize the Advanced Typing Simulator
        
        Args:
            parent_directory (str): Path to the directory containing files to type in
        """
        self.parent_directory = parent_directory or os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        self.running = False
        self.current_session_start = None
        self.break_start_time = None
        self.on_break = False
        self.files_to_process = []
        self.current_file_index = 0
        self.session_stats = {
            'files_processed': 0,
            'characters_typed': 0,
            'session_start': None,
            'breaks_taken': 0
        }
        
        # Typing behavior parameters
        self.typing_speed_range = (0.05, 0.3)  # seconds between keystrokes
        self.burst_typing_chance = 0.15  # 15% chance of fast typing bursts
        self.pause_chance = 0.08  # 8% chance of longer pauses
        self.mistake_chance = 0.03  # 3% chance of making typing mistakes
        
        # Break parameters (in minutes)
        self.work_session_range = (32, 130)   # Work for 45-90 minutes
        self.break_duration_range = (5, 23)  # Break for 30-90 minutes (30mins to 1.5 hours)
        
        # Character sets for different typing scenarios (letters and numbers only)
        self.char_sets = {
            'letters': string.ascii_letters,
            'numbers': string.digits,
            'words': ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'may', 'say', 'she', 'use', 'your']
        }
        
        # Disable pyautogui fail-safe (move mouse to corner to stop)
        pyautogui.FAILSAFE = True
        pyautogui.PAUSE = 0.01  # Minimal pause between actions
        
        print(f"🤖 Advanced Typing Simulator initialized")
        print(f"📁 Target directory: {self.parent_directory}")
        print(f"⚠️  Move mouse to top-left corner to emergency stop")

    def log_activity(self, message):
        """Log activity with timestamp"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_message = f"[{timestamp}] {message}"
        print(log_message)
        
        # Also write to log file
        try:
            with open("typing_simulator.log", "a", encoding="utf-8") as f:
                f.write(log_message + "\n")
        except Exception:
            pass

    def get_supported_files(self):
        """Get list of text-based files from the parent directory (excluding Python files)"""
        supported_extensions = {
            '.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json',
            '.md', '.txt', '.yml', '.yaml', '.xml', '.sql', '.sh', '.bat',
            '.java', '.cpp', '.c', '.h', '.php', '.rb', '.go', '.rs'
        }
        
        files = []
        try:
            for root, dirs, filenames in os.walk(self.parent_directory):
                # Skip hidden directories and common ignore patterns
                dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', '__pycache__', 'venv', 'env']]
                
                for filename in filenames:
                    if any(filename.endswith(ext) for ext in supported_extensions):
                        full_path = os.path.join(root, filename)
                        files.append(full_path)
            
            # Shuffle files for random processing order
            random.shuffle(files)
            self.log_activity(f"📋 Found {len(files)} supported files (excluding Python files)")
            
        except Exception as e:
            self.log_activity(f"❌ Error scanning directory: {e}")
            
        return files

    def should_take_break(self):
        """Determine if it's time for a break based on work session duration"""
        if not self.current_session_start:
            return False
            
        work_duration = (datetime.now() - self.current_session_start).total_seconds() / 60
        target_work_duration = random.randint(*self.work_session_range)
        
        return work_duration >= target_work_duration

    def take_break(self):
        """Take a human-like break - complete rest with no activity"""
        break_duration = random.randint(*self.break_duration_range)
        self.break_start_time = datetime.now()
        self.on_break = True
        self.session_stats['breaks_taken'] += 1
        
        self.log_activity(f"☕ Taking a complete rest break for {break_duration} minutes ({break_duration/60:.1f} hours)")
        self.log_activity(f"📊 Session stats: {self.session_stats['files_processed']} files, {self.session_stats['characters_typed']} characters")
        self.log_activity("😴 No typing or movement during break - complete rest...")
        
        # Complete rest - no activity for break duration
        break_start = datetime.now()
        while (datetime.now() - break_start).total_seconds() < (break_duration * 60):
            if not self.running:  # Allow emergency stop during break
                break
            time.sleep(30)  # Check every 30 seconds for stop signal
        
        self.on_break = False
        self.current_session_start = datetime.now()
        self.log_activity(f"🚀 Break over after {break_duration} minutes! Resuming work...")

    def open_file_in_vscode(self, file_path):
        """Open a file in VS Code using Ctrl+P quick open"""
        try:
            # Use Ctrl+P to open quick open
            pyautogui.hotkey('ctrl', 'p')
            time.sleep(0.5)
            
            # Type the relative file path
            relative_path = os.path.relpath(file_path, self.parent_directory)
            pyautogui.write(relative_path, interval=0.02)
            time.sleep(0.3)
            
            # Press Enter to open the file
            pyautogui.press('enter')
            time.sleep(1)  # Wait for file to load
            
            self.log_activity(f"📂 Opened file: {relative_path}")
            return True
            
        except Exception as e:
            self.log_activity(f"❌ Failed to open file {file_path}: {e}")
            return False

    def generate_random_content(self, content_type="mixed"):
        """Generate random content based on type (letters and numbers only)"""
        content_generators = {
            'letters': lambda: ''.join(random.choices(self.char_sets['letters'], k=random.randint(3, 8))),
            'numbers': lambda: ''.join(random.choices(self.char_sets['numbers'], k=random.randint(2, 5))),
            'word': lambda: random.choice(self.char_sets['words']),
            'mixed': lambda: self.generate_random_content(random.choice(['letters', 'numbers', 'word']))
        }
        
        return content_generators.get(content_type, content_generators['mixed'])()

    def simulate_human_typing(self, text):
        """Simulate human-like typing with variations in speed and mistakes"""
        for i, char in enumerate(text):
            if not self.running or self.on_break:  # Stop typing if on break
                break
                
            # Random typing speed variation
            if random.random() < self.burst_typing_chance:
                # Fast typing burst
                delay = random.uniform(0.01, 0.05)
            elif random.random() < self.pause_chance:
                # Longer pause (thinking)
                delay = random.uniform(0.5, 2.0)
            else:
                # Normal typing speed
                delay = random.uniform(*self.typing_speed_range)
            
            # Simulate typing mistakes
            if random.random() < self.mistake_chance and i > 0:
                # Type wrong character then backspace
                wrong_char = random.choice(self.char_sets['letters'])
                pyautogui.write(wrong_char)
                time.sleep(0.1)
                pyautogui.press('backspace')
                time.sleep(0.1)
            
            # Type the actual character
            pyautogui.write(char)
            self.session_stats['characters_typed'] += 1
            
            time.sleep(delay)

    def add_random_typing_session(self):
        """Add a session of random typing in the current file (letters and numbers only)"""
        session_length = random.randint(10, 50)  # Number of typing actions
        
        for _ in range(session_length):
            if not self.running or self.on_break:  # Stop if on break
                break
                
            # Generate random content (only letters, numbers, and words)
            content_type = random.choice(['mixed', 'letters', 'word', 'numbers'])
            content = self.generate_random_content(content_type)
            
            # Add some variety with spaces and newlines (no brackets or symbols)
            if random.random() < 0.3:
                content += ' '
            elif random.random() < 0.1:
                content += '\n'
            
            # Type the content
            self.simulate_human_typing(content)
            
            # Random pause between typing sessions
            pause_duration = random.uniform(0.5, 3.0)
            time.sleep(pause_duration)

    def clear_file_content(self):
        """Clear all content from the current file"""
        try:
            # Select all (Ctrl+A) and delete
            pyautogui.hotkey('ctrl', 'a')
            time.sleep(0.2)
            pyautogui.press('delete')
            time.sleep(0.5)
            self.log_activity("🗑️  Cleared file content")
        except Exception as e:
            self.log_activity(f"❌ Error clearing content: {e}")

    def process_file(self, file_path):
        """Process a single file with random typing"""
        if not self.open_file_in_vscode(file_path):
            return False
        
        # Random number of typing sessions for this file
        num_sessions = random.randint(2, 6)
        self.log_activity(f"⌨️  Starting {num_sessions} typing sessions in {os.path.basename(file_path)}")
        
        for session in range(num_sessions):
            if not self.running:
                break
                
            self.log_activity(f"📝 Session {session + 1}/{num_sessions}")
            self.add_random_typing_session()
            
            # Random pause between sessions
            if session < num_sessions - 1:
                pause = random.uniform(2, 8)
                time.sleep(pause)
        
        # Clear the file content before moving to next file
        self.clear_file_content()
        self.session_stats['files_processed'] += 1
        
        return True

    def run_simulation(self):
        """Main simulation loop"""
        self.running = True
        self.session_stats['session_start'] = datetime.now()
        self.current_session_start = datetime.now()
        
        # Get list of files to process
        self.files_to_process = self.get_supported_files()
        if not self.files_to_process:
            self.log_activity("❌ No supported files found!")
            return
        
        self.log_activity(f"🎯 Starting simulation with {len(self.files_to_process)} files")
        self.log_activity("📋 Press Ctrl+C in terminal or move mouse to top-left corner to stop")
        
        # Initial delay to let user position VS Code
        self.log_activity("⏰ Starting in 5 seconds... Make sure VS Code is active")
        time.sleep(5)
        
        try:
            while self.running and self.current_file_index < len(self.files_to_process):
                # Check if it's time for a break
                if self.should_take_break():
                    self.take_break()
                
                if not self.running:
                    break
                
                # Process current file
                current_file = self.files_to_process[self.current_file_index]
                success = self.process_file(current_file)
                
                if success:
                    # Random delay before next file
                    delay = random.uniform(3, 10)
                    self.log_activity(f"⏱️  Waiting {delay:.1f}s before next file...")
                    time.sleep(delay)
                
                self.current_file_index += 1
                
                # If we've processed all files, shuffle and start over
                if self.current_file_index >= len(self.files_to_process):
                    self.log_activity("🔄 Completed all files, reshuffling and continuing...")
                    random.shuffle(self.files_to_process)
                    self.current_file_index = 0
        
        except KeyboardInterrupt:
            self.log_activity("⛔ Received stop signal")
        except Exception as e:
            self.log_activity(f"❌ Unexpected error: {e}")
        finally:
            self.stop_simulation()

    def stop_simulation(self):
        """Stop the simulation and print statistics"""
        self.running = False
        end_time = datetime.now()
        
        if self.session_stats['session_start']:
            total_duration = end_time - self.session_stats['session_start']
            self.log_activity(f"📊 Simulation ended after {total_duration}")
            self.log_activity(f"📈 Final stats:")
            self.log_activity(f"   • Files processed: {self.session_stats['files_processed']}")
            self.log_activity(f"   • Characters typed: {self.session_stats['characters_typed']}")
            self.log_activity(f"   • Breaks taken: {self.session_stats['breaks_taken']}")
        
        self.log_activity("👋 Simulation stopped")

def main():
    """Main entry point"""
    print("🚀 Advanced VS Code Typing Simulator")
    print("=" * 50)
    
    # Get parent directory (or use current directory's parent)
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(os.path.dirname(current_dir))
    
    print(f"📁 Target directory: {parent_dir}")
    print(f"⚠️  Make sure VS Code is open and active!")
    print(f"⚠️  Move mouse to top-left corner to emergency stop")
    
    input("\nPress Enter to start the simulation...")
    
    # Create and run simulator
    simulator = AdvancedTypingSimulator(parent_dir)
    
    try:
        simulator.run_simulation()
    except KeyboardInterrupt:
        print("\n⛔ Stopping simulation...")
        simulator.stop_simulation()

if __name__ == "__main__":
    main()



